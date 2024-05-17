'use client'

import { createComment } from "@/app/lib/actions"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

export default function CommentSection({ userId, postId }: { userId: any, postId: any }) {
  const [comment, setComment] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res: any = z.object({
      comment: z
        .string()
        .min(3, { message: 'Comment must be at least 3 characters long.' })
        .trim(),
    }).safeParse({
      comment: comment
    })

    if (!res.success) {
      toast.error(res?.error?.flatten()?.fieldErrors?.comment[0])
      setLoading(false)
      return
    }

    const data = await createComment(comment, userId, postId)
    
    if (data) {
      toast.success("Comment sent")
      setComment('')
      router.refresh()
      setLoading(false)
    } else {
      toast.error("Comment not sent")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 flex flex-col gap-4">
      <textarea value={comment} onChange={(e) => { setComment(e.target.value) }} name="" id="textfield" placeholder="Post your comment" className="w-full h-20 border border-gray-500 bg-transparent focus:outline-none p-3 resize-none rounded"></textarea>
      <button disabled={loading} type="submit" className="w-fit px-5 py-1.5 bg-slate-400/40 rounded-md disabled:bg-slate-400/10 disabled:cursor-not-allowed">{loading ? 'Commenting' : 'Comment'}</button>
    </form>
  )
}
