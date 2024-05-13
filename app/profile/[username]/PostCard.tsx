import Image from "next/image"
import Link from "next/link"
import InteractionSection from "./InteractionSection"

type PostCardType = {
  id: string,
  authorId: string,
  image: any,
  name: string,
  content: string,
  username: string,
  user: any,
  ifLiked: any
}

export default function PostCard({ id, authorId, image, name, username, content, user, ifLiked }: PostCardType) {
  return (
    <div className='p-4 flex gap-2'>
      <div className='w-[15%]'>
        <Link href={`/profile/${username}`}>
          <Image src={image} alt='Profile Picture' width={300} height={180} className='w-10 h-10 rounded-full' />
        </Link>
      </div>
      <div className='w-full self-start'>
        <div className='text-white/80 flex flex-col text-sm'>
          <span className='font-bold'>{name}</span>
          <span>@{username}</span>
        </div>
        <Link href={`/post/${username}/${id}`}>
          <p className='text-sm my-2'>
            {content}
          </p>
        </Link>
        {user &&
          <InteractionSection authorId={authorId} ifLiked={ifLiked} userId={user.user.id} postId={id}/>
        }
      </div>
    </div>
  )
}
