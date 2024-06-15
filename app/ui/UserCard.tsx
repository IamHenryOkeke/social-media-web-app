import Image from "next/image"
import Link from "next/link"

type UserCardType = {
  name: string,
  username: string,
  image: any
}

export default function UserCard({ image, name, username }: UserCardType) {
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
      </div>
    </div>
  )
}
