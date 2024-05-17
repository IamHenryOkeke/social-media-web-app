
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import VerifyForm from './verify-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify Email'
}

export default async function Verify() {
  const user = await auth()

  if (user) {
    redirect('/home')
  }

  return (
    <div className="p-5 lg:p-11 flex flex-col gap-5 md:gap-10">
      <VerifyForm />
    </div>
  )
}