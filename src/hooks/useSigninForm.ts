"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function useSignInForm() {
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
        email: email || "",
        password: password || "",
        redirect: false,
      });
      if (result?.error) {
        setError(result?.error || "");
        toast.error(result?.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      setError((error as string) || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    LoginButtonHandler,
  };
}