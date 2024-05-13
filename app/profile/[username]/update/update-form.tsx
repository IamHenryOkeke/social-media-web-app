'use client'

import { updateData } from "@/app/lib/actions"
import { useFormState, useFormStatus } from "react-dom"


export default function UpdateForm({ userDetails}: { userDetails:  any}) {
  const [state, action] = useFormState(updateData, undefined)

  return (
    <form action={action} className="mx-auto w-[90%] md:w-3/5 lg:w-2/5 flex flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="name">Name</label>
        <input defaultValue={userDetails.name} className="border-gray-500 bg-transparent focus:outline-none w-full p-3 border rounded-md" id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p className="text-sm text-red-500 self-start">{state.errors.name}</p>}

      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="name">Username</label>
        <input defaultValue={userDetails.username} className="border-gray-500 bg-transparent  focus:outline-none w-full p-3 border rounded-md" id="username" name="username" placeholder="username" />
      </div>
      {state?.errors?.username && <p className="text-sm text-red-500 self-start">{state.errors.username}</p>}
      
      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="password">Bio</label>
        <textarea defaultValue={userDetails.bio} className="border-gray-500 bg-transparent  focus:outline-none w-full p-3 border rounded-md" id="bio" name="bio" />
      </div>
      {state?.errors?.bio && <p className="text-sm text-red-500 self-start">{state.errors.bio}</p>}

      <UpdateButton />
      {state?.error && <p className="text-red-500">{state?.error}</p>}
    </form>
  )
}

function UpdateButton() {
  const { pending } = useFormStatus()

  return (
    <button className="w-full my-2 p-3 rounded-md font-bold hover:bg-slate-500/80 bg-slate-500" aria-disabled={pending} type="submit">
      {pending ? 'Updating data. Please hold on.....' : 'Update Data'}
    </button>
  )
}