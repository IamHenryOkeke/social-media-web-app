import type { Metadata } from 'next'
import React from 'react'
import CreatePost from './create-post'
import { auth } from '@/auth'
import PreviousPageButton from '../ui/PreviousPageButton'

export const metadata: Metadata = {
  title: "Create Post",
}

export default async function page() {
  const session = await auth()
  return (
    <div className=''>
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          Compose a Post
        </h3>
      </div>
      <CreatePost id={session?.user?.id} />
    </div>
  )
}
