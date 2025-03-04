'use client'
import React, { useState } from 'react'
import { Button } from '../button/Button'
import CustomInput from '../customInput/CustomInput'

export default function ChangePasswordForm() {
    const[oldPassword,setOldPassword]=useState('')
    const[newPassword,setNewPassword]=useState('')
    const[confirmNewPassword,setConfirmNewPassword]=useState('')
    const resetHandler=()=>{

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
      />
      <CustomInput
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        placeholder="New Password"
        width="w-full"
      />
      <CustomInput
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
        width="w-full"
      />
      <Button title="Reset Password" Type="submit" />
      
    </form>  )
}
