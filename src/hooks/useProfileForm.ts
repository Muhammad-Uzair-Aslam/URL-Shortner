"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook/reduxHook";
import { updateProfile } from "@/redux/slices/profileSlice";
import { toast } from "react-toastify";

export function useProfileForm() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error, message } = useAppSelector((state) => state.profile);

  useEffect(() => {
    setEmail(session?.user?.email ?? "");
    setName(session?.user?.name ?? "");
  }, [session]);

  const updateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        updateProfile({
          email: session?.user?.email || "",
          name: name || "",
        })
      ).unwrap();
      toast.success(message || "Profile updated successfully");
    } catch (err: unknown) {
      toast.error(error || "Failed to update profile");
    }
  };

  return {
    email,
    name,
    setName,
    loading,
    error,
    message,
    updateHandler,
  };
}
