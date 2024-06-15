'use client'

import { followUser, unfollowUser } from "@/app/lib/actions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function FollowBtn({ isFollowing, userId, targetId }: { isFollowing: any, userId: string, targetId: string }) {
  const router = useRouter()
  console.log(isFollowing, userId, targetId)

  const handleFollow = async () => {
    const data = await followUser(userId, targetId)
    console.log(data)
    if (data) {
      router.refresh()
    } else {
      toast.error("Action not successful")
    }
  }

  const handleUnfollow = async () => {
    const data = await unfollowUser(userId, targetId)
    console.log(data)
    if (data) {
      router.refresh()
    } else {
      toast.error("Action not successful")
    }
  }
  
  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow} className="bg-gray-500 px-5 py-1 rounded-md font-medium text-sm">
      {
        isFollowing ? 'Unfollow' : 'Follow'
      }
    </button>
  )
}
