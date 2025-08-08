'use client'

import Link from 'next/link'
import { useAuth } from './auth-provider'
import { Button } from '@/components/ui/button'
import { Leaf, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">RubberConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/market-prices" className="text-gray-700 hover:text-green-600">
              Market Prices
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600">
              Contact
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href={user.type === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard'}
                  className="text-gray-700 hover:text-green-600"
                >
                  Dashboard
                </Link>
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <Button onClick={logout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/market-prices" className="text-gray-700 hover:text-green-600">
                Market Prices
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600">
                Contact
              </Link>
              {user ? (
                <>
                  <Link 
                    href={user.type === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard'}
                    className="text-gray-700 hover:text-green-600"
                  >
                    Dashboard
                  </Link>
                  <Button onClick={logout} variant="outline" size="sm" className="w-fit">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
