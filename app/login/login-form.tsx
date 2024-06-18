'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';
import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <form action={dispatch} className="mx-auto w-[90%] flex flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="email">Email</label>
        <input className="w-full focus:outline-none p-3 border border-gray-500 bg-transparent rounded-md" id="email" name="email" type="email" placeholder="Email" />
      </div>

      <div className="relative w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="password">Password</label>
        <input className="w-full border border-gray-500 bg-transparent focus:outline-none p-3 rounded-md" id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
        {
          showPassword ? <EyeIcon className='cursor-pointer absolute h-5 w-5 bottom-4 right-3' onClick={() => setShowPassword(!showPassword)} /> : <EyeSlashIcon className='cursor-pointer absolute h-5 w-5 bottom-4 right-3' onClick={() => setShowPassword(!showPassword)} />
        }
      </div>
      <Link href='/forgot-password' className='self-end text-sm pt-1'>
        Forgot Password
      </Link>
      <LoginButton />
      {errorMessage?.error && <p className="text-sm text-red-500 my-2">{errorMessage.error}</p>}
      {errorMessage?.success && <p className="text-sm text-green-500 my-2">{errorMessage.success}</p>}
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="w-full my-2 p-3 rounded-md font-bold hover:bg-slate-500/80 bg-slate-500" aria-disabled={pending} type="submit">
      {pending ? 'Signing in...' : 'Sign in'}
    </button>
  );
}
