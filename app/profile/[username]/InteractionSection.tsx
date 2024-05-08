'use client'

import { toggleLikePost, deletePost } from '@/app/lib/actions'
import { HandThumbUpIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as Liked } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function InteractionSection({ ifLiked, userId, postId }: { ifLiked: boolean, userId: string, postId: string }) {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await toggleLikePost(userId, postId)
    console.log(data)
    if (data) {
      router.refresh()
    } else {
      toast.error("Action not successful")
    }
  }

  const handleDelete = async () => {
    const data = await deletePost(postId)
    console.log(data)
    if (data) {
      toast.success("Post deleted")
      router.refresh()
    } else {
      toast.error("Action not successful")
    }
  }

  return (
    <div className="px-4 flex justify-between">
      <button onClick={handleOnClick}>
        {
          ifLiked ?
            <Liked title='Unlike post' className='text-blue-300 size-5 font-bold' /> :
            <HandThumbUpIcon title='Like post' className='text-white size-5 font-bold' />
        }
      </button>
      <button onClick={handleDelete}>
        <TrashIcon title='Delete post' className='text-white size-5 font-bold' />
      </button>
    </div>
  )
}
