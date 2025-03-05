'use client'
import React, { useState } from 'react'
import { Button } from '../button/Button'
import CustomInput from '../customInput/CustomInput'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook/ReduxHook'
import { toast } from 'react-toastify'
import { changePassword } from '@/redux/slices/authSlices'
import Loader from '../loader/Loader'

export default function ChangePasswordForm() {
    const[oldPassword,setOldPassword]=useState('');
    const[newPassword,setNewPassword]=useState('');
    const[confirmNewPassword,setConfirmNewPassword]=useState('');
    const router=useRouter();
    const dispatch=useAppDispatch()
    const {loading, error,resetMessage}=useAppSelector((state)=>state.auth)
    const {data:session,status}=useSession();
    if (status === "loading") return <p>Loading...</p>;
   if (status === "unauthenticated") {
    router.push("/signin");
    return null;
  }
    const resetHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault()
       if (newPassword !== confirmNewPassword) {
        toast.error("New passwords do not match");
        return;
      }
      try {
        await dispatch(
          changePassword({
            email: session?.user?.email!, 
            oldPassword,
            newPassword,
          })
        ).unwrap();
        toast.success(resetMessage || "Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } catch (err) {
        toast.error(error || "Failed to change password");
      }
    }
  return (
<form
      onSubmit={resetHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        onChange={(e) => setOldPassword(e.target.value)}
        type="password"
        placeholder="Old Password"
        width="w-full"
        value={oldPassword}
      />
      <CustomInput
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        placeholder="New Password"
        width="w-full"
        value={newPassword}
      />
      <CustomInput
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
        width="w-full"
        value={confirmNewPassword}
      />
        {loading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
        {resetMessage && <p className="text-green-500">{resetMessage}</p>}
      <Button title="Change Password" Type="submit" />
      
    </form>  )
}
