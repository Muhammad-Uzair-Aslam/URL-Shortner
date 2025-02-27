'use client'
import { signOut } from 'next-auth/react';
import React from 'react'

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()}>Logout</button>
)
}
