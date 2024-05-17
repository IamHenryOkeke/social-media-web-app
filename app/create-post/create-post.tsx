'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createPost } from '../lib/actions'
import { z } from 'zod'

export default function CreatePost({ id }: { id: any }) {
  const router = useRouter()
  const [post, setPost] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const res: any = z.object({
      post: z
        .string()
        .min(3, { message: 'Post must be at least 3 characters long.' })
        .max(250, { message: 'Post must not exceed 250 characters long.' })
        .trim(),
    }).safeParse({
      post: post
    })

    if (!res.success) {
      toast.error(res?.error?.flatten()?.fieldErrors?.post[0])
      setLoading(false)
      return
    }

    const data = await createPost(post, id)
    console.log(data)
    if (data) {
      toast.success("Post sent")
      router.push('/home')
    } else {
      toast.error("Post not sent")
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="mx-auto w-[90%] flex flex-col items-center justify-center gap-2">
      <textarea value={post} onChange={(e) => setPost(e.target.value)} name="" id="textfield" placeholder="Post your comment" className="w-full h-40 border border-gray-500 bg-transparent focus:outline-none p-3 resize-none rounded" minLength={3}></textarea>
      <div className='text-xs font-semibold w-full self-end flex justify-between'>
        <p className={`${post.length > 250 ? 'text-red-400' : ''}`}>{post.length > 250 ? 'Max post length exceeded' : ''}</p>
        <p className='self-end text-white/40'><span className={`${post.length > 250 ? 'text-red-400' : ''}`}>{post.length}</span>/250</p>
      </div>
      <button disabled={loading} type="submit" className="w-fit px-5 py-1.5 bg-slate-400/40 rounded-md disabled:bg-slate-400/10 disabled:cursor-not-allowed">{loading ? 'Submitting Post' : 'Submit Post'}</button>
    </form>
  )
}
