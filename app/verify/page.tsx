'use client'

import React, { useState } from 'react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { verifyEmailByToken } from '../lib/actions'

export default function Verify() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    redirect('/login')
  }

  const handleVerification = async () => {
    setLoading(true)
    try {
      const res = await verifyEmailByToken(token)
      toast.success(res)
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
      router.push('/login')
    }
  }

  return (
    <div className="p-5 lg:p-11 flex flex-col gap-5 md:gap-10">
      <div className="py-2 lg:px-14 lg:w-3/5 lg:mx-auto">
        <button onClick={handleVerification} className="w-full my-2 p-3 rounded-md font-bold hover:bg-slate-500/80 bg-slate-500" aria-disabled={loading} type="submit">
          {loading ? "Verifying email..." : "Verify email"}
        </button>
      </div>
    </div>
  )
}