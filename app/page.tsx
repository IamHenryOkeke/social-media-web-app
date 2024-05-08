import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user =  await auth()
  if (user) {
    redirect('/home')
  }
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <Image src='/Logo.svg' alt="Logo" width={300} height={180}/>
      <Link href='/home' className="hover:text-white/80">
        Say Hey
      </Link>
    </main>
  );
}
