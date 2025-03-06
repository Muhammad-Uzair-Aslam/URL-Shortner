'use client'
import React, { useState } from 'react'
import { Button } from '../button/Button'
import CustomInput from '../customInput/CustomInput'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook/reduxHook'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { forgotPassword } from '@/redux/slices/authSlices'
import Loader from '../loader/Loader'
export default function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error, resetMessage } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
      await dispatch(forgotPassword({ email })).unwrap();
      toast.success("Reset link sent to your email!");
      setEmail("");
    } catch (err) {
      toast.error(error || "Failed to send reset link");
    }
  };
  return (
<form
      onSubmit={handleForgotPassword}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        width="w-full"
        value={email}
      />
      
      {loading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
        {resetMessage && <p className="text-green-500">{resetMessage}</p>}
      <Button title="Reset Password" Type="submit" />
      
    </form>  )
}
