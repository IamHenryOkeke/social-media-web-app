import { Metadata } from "next"
import { getFollowings } from '@/app/lib/data';
import PreviousPageButton from '@/app/ui/PreviousPageButton';
import UserCard from "@/app/ui/UserCard";

export function generateMetadata({ params }: { params: { username: string } }): Metadata {
  return {
    title: `People who ${params.username} follows`,
  }
}

export default async function page({ params }: { params: { username: string } }) {
  const followings = await getFollowings(params.username)
  return (
    <div className="h-screen md:border-x-2 border-gray-600 mx-auto md:w-3/5 lg:w-2/5">
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          Followings
        </h3>
      </div>
      <div>
        {
          !(followings?.length === 0) ?
            <section className='my-5 border-y-2 border-gray-600 divide-y-2 divide-gray-600'>
              {
                followings?.map((following) => (
                  <UserCard key={following.id} name={following.following.name} image={following.following.image} username={following.following.username} />
                ))
              }
            </section> :
            <div className='text-center my-5 p-4 border-t-2 border-gray-600'>
              <h2 className="lg:text-3xl font-bold">
                @{params.username} isn&apos;t following anyone
              </h2>
              <p>Once they follow any account, they&apos;ll show up here.</p>
            </div>
        }
      </div>
    </div>
  )
}
