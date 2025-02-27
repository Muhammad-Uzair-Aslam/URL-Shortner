'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from "react";
import { toast } from "react-toastify";
import CustomInput from '../customInput/CustomInput';
import { Button } from '../button/Button';
import Loader from '../loader/Loader';
export default function SignUpForm() {
    const [name, setName] = useState('');
    const [loading,setLoading]=useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const router=useRouter()
  const SignupButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (password !== confirmPassword) {
      toast.error("Please enter the same password in both fields");
      setLoading(false)
      return;
    }
    if (!name || !email || !password) {
      toast.error("Please fill all the required fields");
      setLoading(false)
      return;
    }
    if (!strongPasswordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
      setLoading(false)
      return;
    }
    try {
      const result = await fetch('/api/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      console.log("result",result)
      const response = await result.json();
      if (result.ok) {
        toast.success("User registered successfully");
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        router.push('./signin');
      } else {
        toast.error(response.message || "User Registration Failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    }
    finally{
        setLoading(false)
    }
  };
  return (
    <form onSubmit={SignupButtonHandler} className="w-full max-w-[560px] space-y-4 flex flex-col items-center justify-center">
         
    <CustomInput value={email||''} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" width="w-full" />
    <CustomInput value={name||''} onChange={e => setName(e.target.value)} type="text" placeholder="Name" width="w-full" />
    <CustomInput value={password||''} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" width="w-full" />
    <CustomInput value={confirmPassword||''} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" width="w-full" />
    {loading&&<Loader/>}
    <Button title="Register" Type="submit" />
  </form>  )
}
