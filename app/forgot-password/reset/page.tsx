
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
    <div>
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