import React from 'react'
import UpdateForm from './update-form'
import { auth } from '@/auth'
import { getUserByEmail } from '@/app/lib/data'
import PreviousPageButton from '@/app/ui/PreviousPageButton'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Update Profile",
}

export default async function page() {
  const user: any = await auth()
  const userData = await getUserByEmail(user?.user?.email)
  return (
    <div className='h-screen md:border-x-2 border-gray-600 mx-auto md:w-3/5 lg:w-2/5'>
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          Update your infos
        </h3>
      </div>
      <UpdateForm userDetails={userData} />
    </div>
  )
}
