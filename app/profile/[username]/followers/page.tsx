import { Metadata } from "next"
import { getFollowers } from '@/app/lib/data';
import PreviousPageButton from '@/app/ui/PreviousPageButton';
import UserCard from "@/app/ui/UserCard";

export function generateMetadata({ params }: { params: { username: string } }): Metadata {
  return {
    title: `People who follow ${params.username}`,
  }
}

export default async function page({ params }: { params: { username: string } }) {
  const followers = await getFollowers(params.username)
  return (
    <div className="h-screen md:border-x-2 border-gray-600 mx-auto md:w-3/5 lg:w-2/5">
      <div className='p-4 flex gap-3 items-center'>
        <PreviousPageButton />
        <h3 className='font-bold'>
          Followers
        </h3>
      </div>
      <div>
        {
          !(followers?.length === 0) ?
            <section className='my-5 border-y-2 border-gray-600 divide-y-2 divide-gray-600'>
              {
                followers?.map((follower) => (
                  <UserCard key={follower.id} name={follower.follower.name} image={follower.follower.image} username={follower.follower.username} />
                ))
              }
            </section> :
            <div className='text-center my-5 p-4 border-t-2 border-gray-600'>
              <h2 className="lg:text-3xl font-bold">
                No one is following @{params.username}
              </h2>
              <p>Once anyone follow @{params.username}, they&apos;ll show up here.</p>
            </div>}
      </div>
    </div>
  )
}
