import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold">RubberConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting Tripura's rubber farmers to fair markets and transparent pricing.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/market-prices" className="text-gray-400 hover:text-white">Market Prices</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-white">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Farmers</h3>
            <ul className="space-y-2">
              <li><Link href="/farmer/dashboard" className="text-gray-400 hover:text-white">Farmer Dashboard</Link></li>
              <li><Link href="/register?type=farmer" className="text-gray-400 hover:text-white">Join as Farmer</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">support@rubberconnect.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">Agartala, Tripura</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 RubberConnect. All rights reserved. Made for Tripura's rubber farming community.
          </p>
        </div>
      </div>
    </footer>
  )
}
