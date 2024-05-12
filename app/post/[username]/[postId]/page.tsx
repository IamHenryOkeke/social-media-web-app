import { Metadata } from "next"
import { getCommentsByPostId, getPostById } from '@/app/lib/data'
import PreviousPageButton from '@/app/ui/PreviousPageButton'
import { auth } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CommentSection from './CommentSection'
import CommentCard from './CommentCard'
import InteractionSection from './InteractionSection'

export async function generateMetadata({ params }: { params: { username: string, postId: string } }) {
const data = await getPostById(params.postId)
  return {
    title: data?.content,
  }
}

export default async function page({ params }: { params: { username: string, postId: string } }) {
  const user = await auth()
  const data = await getPostById(params.postId)
  const comments = await getCommentsByPostId(params.postId)
  const ifUserLiked = !!(data?.likes.find((like) => like.userId === user?.user?.id))

  return (
    <main>
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          Post
        </h3>
      </div>
      <div className='space-y-4 px-4 py-2'>
        <div className='flex gap-2'>
          <div className='w-[15%]'>
            <Link href={`/profile/${params.username}`}>
              <Image src={data?.author.image || ''} alt='Profile Picture' width={300} height={180} className='w-10 h-10 rounded-full' />
            </Link>
          </div>
          <div className='w-full self-start'>
            <div className='flex flex-col text-sm'>
              <span className='text-white/90 font-bold'>{data?.author.name}</span>
              <span className='text-white/50'>@{data?.author.username}</span>
            </div>
          </div>
        </div>
        <p className='text-sm my-2'>
          {data?.content}
        </p>
        <div className='text-sm text-white/50 flex justify-between'>
          <p>
            {(data?.createdAt)?.toLocaleTimeString()} - {(data?.createdAt)?.toDateString()}
          </p>
          <Link href={`./${params.postId}/likes`}>{data?.likes.length === 1 ? '1 Like' : `${data?.likes.length} Likes`} </Link>
        </div>
      </div>
      {user &&
        <InteractionSection liked={ifUserLiked} userId={user?.user?.id} postId={data?.id} />
      }
      {
        user &&
        <CommentSection userId={user?.user?.id} postId={data?.id} />
      }
      {
        !(comments?.length === 0) ?
          <section className='my-5 border-y-2 border-gray-600 divide-y-2 divide-gray-600'>
            {
              comments?.map((comment) => (
                <CommentCard key={comment.id} id={comment.id} content={comment.content} name={comment.author.name} image={comment.author.image} username={comment.author.username} />
              ))
            }
          </section> : user ?
            <p className='text-center my-5 p-4 border-t-2 border-gray-600'>Ouch💔 no comments yet. Be the first to add a comment</p> :
            <p className='text-center my-5 p-4 border-t-2 border-gray-600'>Ouch💔 no comments yet. <Link href='/login' className='underline hover:no-underline'>Login</Link> or <Link className='underline hover:no-underline' href='/signup'>Sign up</Link> to be the first to add a comment</p>
      }
    </main>
  )
}
