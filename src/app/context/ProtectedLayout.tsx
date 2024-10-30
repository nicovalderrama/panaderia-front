'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "./hooks/useAuth"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? <>{children}</> : null
}