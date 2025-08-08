import { Suspense } from 'react'
import { Header } from '@/components/header'
import { RegisterForm, RegisterFormSkeleton } from '@/components/register-form'

// This is a server component that uses Suspense to wrap the client component
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<RegisterFormSkeleton />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  )
}
