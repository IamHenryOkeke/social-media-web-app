'use client'

import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { resetPasswordWithToken } from '@/app/lib/actions'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { ResetPasswordFormSchema } from '@/app/lib/zod-schema'

export default function ResetPasswordForm() {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    redirect('/login')
  }

  const handleOnSumbit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const validatedFields: any = ResetPasswordFormSchema.safeParse({
      password: password,
      confirm_password: confirmPassword
    })

    if (!validatedFields.success) {
      toast.error(validatedFields?.error?.flatten()?.fieldErrors.confirm_password || validatedFields?.error?.flatten()?.fieldErrors.password)
      setLoading(false)
      return
    }

    try {
      const res: any = await resetPasswordWithToken(token, password)
      toast.success(res.success)
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
      router.push('/login')
    }
  }

  return (
    <form onSubmit={handleOnSumbit} className="mx-auto w-[90%] flex flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="password">Password</label>
        <input value={password} onChange={(e: any) => setPassword(e.target.value)} className="border-gray-500 bg-transparent focus:outline-none w-full p-3 border rounded-md" id="password" name="confirm_password" type='password' />
      </div>
      <p>
        
      </p>
      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="confirm_password">Confirm Password</label>
        <input value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} className="border-gray-500 bg-transparent  focus:outline-none w-full p-3 border rounded-md" id="confirm_password" name="confirm_password" type='password' />
      </div>
      <button type='submit' className="disabled:cursor-not-allowed disabled:bg-slate-500/20 w-full my-2 p-3 rounded-md font-bold hover:bg-slate-500/80 bg-slate-500" disabled={loading}>
        {loading ? "Reseting password..." : "Reset Password"}
      </button>
    </form>
  )
}
