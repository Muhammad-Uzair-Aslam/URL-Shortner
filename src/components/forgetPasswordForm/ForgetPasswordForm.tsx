'use client'
import React, { useState } from 'react'
import { Button } from '../button/Button'
import CustomInput from '../customInput/CustomInput'

export default function ForgetPasswordForm() {
    const[email,setEmail]=useState('')
    const resetHandler=()=>{

    }
  return (
<form
      onSubmit={resetHandler}
      className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center"
    >
      <CustomInput
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        width="w-full"
      />
      <Button title="Reset Password" Type="submit" />
      
    </form>  )
}
