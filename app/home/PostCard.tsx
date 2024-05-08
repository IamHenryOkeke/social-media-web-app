import Image from "next/image"
import Link from "next/link"
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as Liked } from '@heroicons/react/24/solid'

type PostCardType = {
  id: string,
  image: any,
  name: string,
  content: string,
  username: string,
  user: boolean,
  ifLiked: any
}

export default function PostCard({ id, image, name, username, content, user, ifLiked }: PostCardType) {
  return (
    <div className='p-4 flex gap-2'>
      <div className='w-[15%]'>
        <Link href={`/profile/${username}`}>
          <Image src={image} alt='Profile Picture' width={300} height={180} className='w-10 h-10 rounded-full' />
        </Link>
      </div>
      <Link href={`/post/${username}/${id}`} className='w-full self-start'>
        <div className='text-white/80 flex flex-col text-sm'>
          <span className='font-bold'>{name}</span>
          <span>@{username}</span>
        </div>
        <p className='text-sm my-2'>
          {content}
        </p>
        {user &&
          <div className="px-4 flex justify-between">
            <button>
              {
                ifLiked ?
                  <Liked title='Unlike post' className='text-blue-300 size-5 font-bold' /> :
                  <HandThumbUpIcon title='Like post' className='text-white size-5 font-bold' />
              }
            </button>

            <button>
              <ChatBubbleOvalLeftEllipsisIcon title='Comment post' className='text-white size-5 font-bold' />
            </button>
          </div>
        }
      </Link>
    </div>
  )
}
