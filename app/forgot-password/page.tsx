import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import ForgotPasswordForm from './forgot-password-form'
import PreviousPageButton from '../ui/PreviousPageButton'

export const metadata: Metadata = {
  title: 'Forgot Password'
}

export default async function ForgotPassword() {
  const user = await auth()

  if (user) {
    redirect('/home')
  }

  return (
    <div className='h-screen md:border-x-2 border-gray-600 mx-auto md:w-3/5 lg:w-2/5'>
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          Reset Password
        </h3>
      </div>
      <ForgotPasswordForm />
    </div>
  )
}