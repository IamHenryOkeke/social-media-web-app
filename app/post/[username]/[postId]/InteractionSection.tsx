'use client'

import { toggleLikePost } from '@/app/lib/actions'
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as Liked } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function InteractionSection({ liked, userId, postId }: { liked?: boolean, userId: any, postId: any}) {
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

  return (
    <div className="border-y-2 border-gray-700 py-4 px-10 flex justify-between">
      <button onClick={handleOnClick}>
        {
          liked ?
            <Liked title='Unlike post' className='text-blue-300 size-5 font-bold' /> :
            <HandThumbUpIcon title='Like post' className='text-white size-5 font-bold' />
        }
      </button>
      <button onClick={() => {
        document.getElementById('textfield')?.focus()
      }}>
        <ChatBubbleOvalLeftEllipsisIcon title='Comment post' className='text-white size-5 font-bold' />
      </button>
    </div>
  )
}
