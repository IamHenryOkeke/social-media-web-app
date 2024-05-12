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
    <div>
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
