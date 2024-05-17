
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Metadata } from 'next'
import ResetPasswordForm from './reset-password-form'
import PreviousPageButton from '@/app/ui/PreviousPageButton'

export const metadata: Metadata = {
  title: 'Reset Password'
}

export default async function Verify() {
  const user = await auth()

  if (user) {
    redirect('/home')
  }

  return (
    <div className='h-screen md:border-x-2 border-gray-600 mx-auto md:w-3/5 lg:w-2/5 '>
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          Reset Password
        </h3>
      </div>
      <ResetPasswordForm />
    </div>
  )
}