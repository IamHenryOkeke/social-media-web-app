import React from 'react'
import ForgotPasswordForm from './forgot-password-form'
import Link from 'next/link'

export default function page() {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='my-4 font-bold text-2xl'>Reset Password</h1>
      <ForgotPasswordForm />
      <Link href='/login'>
        Go back to login
      </Link>
    </div>
  )
}
