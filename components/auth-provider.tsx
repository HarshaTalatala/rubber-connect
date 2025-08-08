'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  type: 'farmer' | 'buyer'
  profile?: any
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: 'farmer' | 'buyer') => Promise<boolean>
  register: (email: string, password: string, name: string, type: 'farmer' | 'buyer') => Promise<boolean>
  logout: () => void
  updateProfile: (profile: any) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Set hydrated flag first to prevent hydration mismatch
    setIsHydrated(true)
    
    // Then check localStorage only on client
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('rubberconnect_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
  }, [])

  const login = async (email: string, password: string, type: 'farmer' | 'buyer') => {
    // Mock authentication - use timestamp + email for consistent ID generation
    const mockUser = {
      id: `${Date.now()}-${email.split('@')[0]}`,
      email,
      name: email.split('@')[0],
      type,
    }
    setUser(mockUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('rubberconnect_user', JSON.stringify(mockUser))
    }
    return true
  }

  const register = async (email: string, password: string, name: string, type: 'farmer' | 'buyer') => {
    // Mock registration - use timestamp + email for consistent ID generation
    const mockUser = {
      id: `${Date.now()}-${email.split('@')[0]}`,
      email,
      name,
      type,
    }
    setUser(mockUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('rubberconnect_user', JSON.stringify(mockUser))
    }
    return true
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rubberconnect_user')
    }
  }

  const updateProfile = (profile: any) => {
    if (user) {
      const updatedUser = { ...user, profile }
      setUser(updatedUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('rubberconnect_user', JSON.stringify(updatedUser))
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
