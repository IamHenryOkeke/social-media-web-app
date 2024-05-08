import Link from "next/link"
import LoginForm from "./login-form"

export default function Login() {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='my-4 font-bold text-2xl'>Please Sign In To continue</h1>
      <LoginForm/>
      <Link href='/signup'>
        Don&apos;t have an account? Sign Up
      </Link>
    </div>
  )
}
