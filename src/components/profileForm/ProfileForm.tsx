"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../button/Button";
import CustomInput from "../customInput/CustomInput";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook/reduxHook";
import { updateProfile } from "@/redux/slices/profileSlice";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import Link from "next/link";

export default function ProfileForm() {
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
          email: session?.user?.email!,
          name,
        })
      ).unwrap();
      toast.success(message || "Profile updated successfully");
    } catch (err) {
      toast.error(error);
    }
  };
  return (
    <form
      onSubmit={updateHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        type="email"
        placeholder="Email"
        width="w-full"
        value={email}
        disabled
      />
      <CustomInput
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        width="w-full"
        value={name}
      />
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <Button title="Update Profile" Type="submit" />
      <div>
        <Link href={'/password/change'}>
        <Button title='Change Password'/>
        </Link>
      </div>
    </form>
  );
}