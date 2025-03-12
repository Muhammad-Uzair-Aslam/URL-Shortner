"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { signupUser } from "@/redux/slices/authSlices";

export function useSignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const SignupButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Please enter the same password in both fields");
      return;
    }
    if (!name || !email || !password) {
      toast.error("Please fill all the required fields");
      return;
    }
    if (!strongPasswordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
      );
      return;
    }

    const result = await dispatch(
      signupUser({
        name: name || "",
        email: email || "",
        password: password || "",
      })
    );

    if (signupUser.fulfilled.match(result)) {
      toast.success("User registered successfully");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/signin");
    } else {
      toast.error((result?.payload as string) || "User Registration Failed");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    SignupButtonHandler,
  };
}
