import type { Metadata } from 'next'
import React from 'react'
import CreatePost from './create-post'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: "Create Post",
}

export default async function page() {
  const session = await auth()
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='my-4 font-bold text-2xl'>Compose a Post</h1>
      <CreatePost id={session?.user?.id}/>
    </div>
  )
}
