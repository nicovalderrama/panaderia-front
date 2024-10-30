import { useState, useEffect } from 'react'
import { getToken, getUser, setToken, setUser, unsetToken, unsetUser, User } from '../utils/auth'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [user, setUserState] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUserFromStorageAndValidate() {
      const token = getToken()
      const storedUser = getUser()

      if (token && storedUser) {
        try {
          const response = await fetch( `http://127.0.0.1:8000/api/usuarios/${storedUser.id}/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            setUserState(storedUser)
          } else {
            unsetToken()
            unsetUser()
          }
        } catch (error) {
          console.error('Error validando token', error)
        }
      }
      setLoading(false)
    }
    loadUserFromStorageAndValidate()
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    setToken(token)
    setUserState(userData)
  }

  const logout = () => {
    unsetToken()
    unsetUser()
    setUserState(null)
    router.push('/login')
  }

  return { user, loading, login, logout }
}