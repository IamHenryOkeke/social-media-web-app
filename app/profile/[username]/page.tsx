import { auth, signOut } from '@/auth';
import Image from 'next/image';
import React from 'react'
import { getUserByUsername, getUserPost } from '../../lib/data';
import PostCard from './PostCard';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Profile({ params }: { params: { username: string } }) {
  const user = await auth()
  const userData = await getUserByUsername(params.username)
  const userPosts = await getUserPost(params.username)
  return (
    <main>
      <h2 className='my-5 font-bold text-center text-xl'>
        User Profile
      </h2>
      <div className='flex flex-col items-center gap-2'>
        <div className='relative'>
          <Image className='h-20 w-20 rounded-full' src={userData?.image || ''} alt="User Avatar" width={300} height={100} />
          {/* {
            userData?.id === user?.user?.id &&
            <Link href={`./${params.username}/update`}>
              <PencilSquareIcon className='absolute h-4 w-4 bottom-0 -right-3 cursor-pointer' />
            </Link>
          } */}
        </div>
        <p className='text-gray-400'>@{userData?.username}</p>
        <p className='font-medium -my-2'>{userData?.email}</p>
        <p className='text-gray-200'>{userData?.bio}</p>
        {
          userData?.id === user?.user?.id &&
          <div className='flex gap-3'>
            <Link href={`./${params.username}/update`} className="bg-gray-500 px-6 py-2 rounded-md font-medium text-sm">
              Edit Profile
            </Link>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/home' });
              }}
            >
              <button className="bg-gray-500 px-6 py-2 rounded-md font-medium text-sm">
                Sign Out
              </button>
            </form>
          </div>
        }
      </div>
      <div className='py-5'>
        <p className='font-bold text-center'>{userData?.name}&apos;s Posts</p>
        <div className='my-2 border-y-2 border-gray-600 divide-y-2 divide-gray-600'>
          {
            userPosts?.map((post) => (
              <PostCard key={post.id} id={post.id} ifLiked={post?.likes.find((like) => like.userId === user?.user?.id)} name={post.author.name} user={user} content={post.content} image={post.author.image} username={post.author.username} />
            ))
          }
        </div>
      </div>
    </main>
  )
}
