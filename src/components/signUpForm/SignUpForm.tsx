"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CustomInput from "../customInput/CustomInput";
import { Button } from "../button/Button";
import Loader from "../loader/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook/reduxHook";
import { signupUser } from "@/redux/slices/authSlices";

export default function SignUpForm() {
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

    const result = await dispatch(signupUser({ name, email, password }));

    if (signupUser.fulfilled.match(result)) {
      toast.success("User registered successfully");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/signin");
    } else {
      toast.error(result.payload as string || "User Registration Failed");
    }
  };

  return (
    <form
      onSubmit={SignupButtonHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        width="w-full"
      />
      <CustomInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        width="w-full"
      />
      <CustomInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        width="w-full"
      />
      <CustomInput
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
        width="w-full"
      />
      {loading && <Loader />}
      {error&&<div className="text-red-600">{error}</div>}
      <Button title="Register" Type="submit"  />
    </form>
  );
}