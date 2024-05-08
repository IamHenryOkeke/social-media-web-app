'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

export default function PreviousPageButton() {
  const router = useRouter()

  return (
    <ChevronLeftIcon onClick={() => router.back()} className="h-5 w-5 cursor-pointer font-semibold" />
  )
}
