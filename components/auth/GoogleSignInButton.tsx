'use client'

import Image from "next/image"
import { signInWithGoogle } from '@/lib/supabase/auth'

export function GoogleSignInButton() {
  return (
    <button
      onClick={() => signInWithGoogle()}
      className="w-full sm:w-auto rounded-xl border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm h-10 px-4 gap-2"
    >
      <Image
        src="/google.svg"
        alt="Google logo"
        width={20}
        height={20}
      />
      <span className="whitespace-nowrap">Sign in with Google</span>
    </button>
  )
} 