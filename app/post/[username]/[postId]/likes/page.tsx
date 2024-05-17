import { Metadata } from "next"
import { getLikesByPostId } from '@/app/lib/data';
import PreviousPageButton from '@/app/ui/PreviousPageButton';
import React from 'react'
import LikeCard from './LikeCard';
import { auth } from '@/auth';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Users who liked this post",
}

export default async function page({ params }: { params: { username: string, postId: string } }) {
  const user = await auth()
  const likes = await getLikesByPostId(params.postId)
  return (
    <div className="h-screen md:border-x-2 border-gray-600 mx-auto md:w-3/5 lg:w-2/5">
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          People who liked this post
        </h3>
      </div>
      <div>
        {
          !(likes?.length === 0) ?
            <section className='my-5 border-y-2 border-gray-600 divide-y-2 divide-gray-600'>
              {
                likes?.map((like) => (
                  <LikeCard key={like.id} name={like.user.name} image={like.user.image} username={like.user.username} />
                ))
              }
            </section> : user ?
              <p className='text-center my-5 p-4 border-t-2 border-gray-600'>Ouch💔 nobody has liked this post yet. Be the first to add a like</p> :
              <p className='text-center my-5 p-4 border-t-2 border-gray-600'>Ouch💔 no like yet. <Link href='/login' className='underline hover:no-underline'>Login</Link> or <Link className='underline hover:no-underline' href='/signup'>Sign up</Link> to be the first to add a like</p>
        }
      </div>
    </div>
  )
}
