'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Leaf } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<'farmer' | 'buyer'>('farmer')
  const [loading, setLoading] = useState(false)
  
  // Using suspense boundary automatically when using client hooks like useSearchParams
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams() // This is wrapped in Suspense in the parent
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const success = await login(email, password, userType)
      if (success) {
        toast({
          title: "Login successful!",
          description: `Welcome back to RubberConnect!`,
        })
        router.push(userType === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard')
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your RubberConnect account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="userType">Account Type</Label>
            <Select value={userType} onValueChange={(value: 'farmer' | 'buyer') => setUserType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-green-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function LoginFormSkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your RubberConnect account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </CardContent>
    </Card>
  )
}
