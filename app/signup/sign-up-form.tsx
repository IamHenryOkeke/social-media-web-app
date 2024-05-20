'use client'

import { signUp } from "../lib/actions"
import { useFormState, useFormStatus } from "react-dom"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from "react";

export function SignupForm() {
  const [state, action] = useFormState(signUp, undefined)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <form action={action} className="mx-auto w-[90%] flex flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="name">Name</label>
        <input className="border border-gray-500 bg-transparent focus:outline-none w-full p-3 rounded-md" id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p className="text-red-500 self-start">{state.errors.name}</p>}

      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="name">Username</label>
        <input className="border border-gray-500 bg-transparent focus:outline-none w-full p-3 rounded-md" id="username" name="username" placeholder="username" />
      </div>
      {state?.errors?.username && <p className="text-red-500 self-start">{state.errors.name}</p>}

      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="image">Display Picture</label>
        <input className="border border-gray-500 bg-transparent w-full p-3 rounded-md" type="file" id="image" name="image" placeholder="Name" />
      </div>
      {state?.errors?.image && <p className="text-red-500 self-start">{state.errors.image}</p>}

      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="email">Email</label>
        <input className="border border-gray-500 bg-transparent focus:outline-none w-full p-3 rounded-md" id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p className="text-red-500 self-start">{state.errors.email}</p>}

      <div className="relative w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="password">Password</label>
        <input className="border border-gray-500 bg-transparent focus:outline-none w-full p-3 rounded-md" id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter a password" />
        {
          showPassword ? <EyeIcon className='cursor-pointer absolute h-5 w-5 bottom-4 right-3' onClick={() => setShowPassword(!showPassword)}/> : <EyeSlashIcon className='cursor-pointer absolute h-5 w-5 bottom-4 right-3' onClick={() => setShowPassword(!showPassword)}/>
        }
      </div>

      {state?.errors?.password && <p className="text-red-500 self-start">{state.errors.password}</p>}
      <SignupButton />
      {state?.error && <p className="text-red-500 self-start">{state?.error}</p>}
    </form>
  )
}

function SignupButton() {
  const { pending } = useFormStatus()

  return (
    <button className="w-full my-2 p-3 rounded-md font-bold hover:bg-slate-500/80 bg-slate-500" aria-disabled={pending} type="submit">
      {pending ? 'Signing Up. Please hold on.....' : 'Sign up'}
    </button>
  )
}