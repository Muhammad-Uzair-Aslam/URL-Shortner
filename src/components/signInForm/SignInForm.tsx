"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CustomInput from "@/components/customInput/CustomInput";
import { Button } from "../button/Button";
import Loader from "../loader/Loader";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const LoginButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError(result?.error);
        toast.error(result?.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Sign-in error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={LoginButtonHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        width="w-full"
      />
      <CustomInput
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        width="w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
      {loading && <Loader />}
      <Button title="Login" Type="submit" />
    </form>
  );
}
