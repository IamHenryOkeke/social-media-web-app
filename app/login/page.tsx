import Link from "next/link"
import LoginForm from "./login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
}

export default function Login() {
  return (
    <div className='h-screen md:border-x-2 border-gray-600 mx-auto md:w-3/5 lg:w-2/5 flex flex-col items-center justify-center'>
      <h1 className='my-4 font-bold text-2xl'>Please Sign In To continue</h1>
      <LoginForm/>
      <Link href='/signup'>
        Don&apos;t have an account? Sign Up
      </Link>
    </div>
  )
}
