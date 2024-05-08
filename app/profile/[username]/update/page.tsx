import React from 'react'
import UpdateForm from './update-form'
import { auth } from '@/auth'
import { getUserByEmail } from '@/app/lib/data'

export default async function page() {
  const user: any = await auth()
  const userData = await getUserByEmail(user?.user?.email)
  console.log(userData)
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='my-4 font-bold text-2xl'>Update your infos</h1>
      <UpdateForm userDetails={userData} />
    </div>
  )
}
