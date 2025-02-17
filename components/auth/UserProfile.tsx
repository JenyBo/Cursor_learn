'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import Image from 'next/image'

export function UserProfile() {
  const { user, loading } = useAuth()

  if (loading) return null
  
  if (!user) return null

  return (
    <div className="flex items-center gap-2">
      {user.user_metadata.avatar_url && (
        <Image
          src={user.user_metadata.avatar_url}
          alt="Profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <span className="text-sm">{user.user_metadata.full_name}</span>
    </div>
  )
} 