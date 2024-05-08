import React from 'react'
import { SignupForm } from './sign-up-form'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='my-4 font-bold text-2xl'>Sign Up</h1>
      <SignupForm/>
      <Link href='/login'>
        Already have an account? Sign in
      </Link>
    </div>
  )
}
