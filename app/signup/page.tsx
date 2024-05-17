import React from 'react'
import { SignupForm } from './sign-up-form'
import Link from 'next/link'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
}
export default function SignUp() {
  return (
    <div className='h-screen md:border-x-2 border-gray-600 mx-auto md:w-3/5 lg:w-2/5 flex flex-col items-center justify-center'>
      <h1 className='my-4 font-bold text-2xl'>Sign Up</h1>
      <SignupForm/>
      <Link href='/login'>
        Already have an account? Sign in
      </Link>
    </div>
  )
}
