'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, MapPin, Package, Filter, MessageSquare, Phone, Mail } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FarmerListing {
  id: string
  farmerId: string
  farmerName: string
  farmerLocation: string
  farmerPhone: string
  type: string
  quantity: number
  quality: string
  moisture: number
  price: number
  description: string
  createdAt: string
}

export default function BuyerDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')
  const [qualityFilter, setQualityFilter] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  
  const [selectedListing, setSelectedListing] = useState<FarmerListing | null>(null)
  const [inquiryMessage, setInquiryMessage] = useState('')
  const [showInquiryForm, setShowInquiryForm] = useState(false)

  // Mock farmer listings data
  const [listings] = useState<FarmerListing[]>([
    {
      id: '1',
      farmerId: 'farmer1',
      farmerName: 'Rajesh Kumar',
      farmerLocation: 'Agartala, West Tripura',
      farmerPhone: '+91 9876543210',
      type: 'RSS-1',
      quantity: 500,
      quality: 'Premium',
      moisture: 0.5,
      price: 185,
      description: 'High quality RSS-1 rubber sheets, properly dried and processed.',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      farmerId: 'farmer2',
      farmerName: 'Priya Devi',
      farmerLocation: 'Udaipur, South Tripura',
      farmerPhone: '+91 9876543211',
      type: 'RSS-3',
      quantity: 750,
      quality: 'Standard',
      moisture: 0.8,
      price: 175,
      description: 'Fresh RSS-3 rubber sheets, ready for immediate delivery.',
      createdAt: '2024-01-14T15:30:00Z'
    },
    {
      id: '3',
      farmerId: 'farmer3',
      farmerName: 'Mohan Das',
      farmerLocation: 'Kailashahar, North Tripura',
      farmerPhone: '+91 9876543212',
      type: 'Latex',
      quantity: 300,
      quality: 'Premium',
      moisture: 0,
      price: 190,
      description: 'Fresh latex directly from trees, collected daily.',
      createdAt: '2024-01-13T08:00:00Z'
    },
    {
      id: '4',
      farmerId: 'farmer4',
      farmerName: 'Sunita Chakraborty',
      farmerLocation: 'Belonia, South Tripura',
      farmerPhone: '+91 9876543213',
      type: 'RSS-4',
      quantity: 1000,
      quality: 'Commercial',
      moisture: 1.2,
      price: 165,
      description: 'Bulk RSS-4 rubber sheets, suitable for industrial use.',
      createdAt: '2024-01-12T12:00:00Z'
    },
    {
      id: '5',
      farmerId: 'farmer5',
      farmerName: 'Biplab Reang',
      farmerLocation: 'Khowai, West Tripura',
      farmerPhone: '+91 9876543214',
      type: 'RSS-3',
      quantity: 600,
      quality: 'Standard',
      moisture: 0.6,
      price: 178,
      description: 'Well-processed RSS-3 sheets with consistent quality.',
      createdAt: '2024-01-11T14:20:00Z'
    }
  ])

  useEffect(() => {
    if (!user || user.type !== 'buyer') {
      router.push('/login')
      return
    }
  }, [user, router])

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.farmerLocation.toLowerCase().includes(searchTerm.toLowerCase())
  
    const matchesLocation = locationFilter === 'all' || !locationFilter || listing.farmerLocation.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesQuality = qualityFilter === 'all' || !qualityFilter || listing.quality === qualityFilter
  
    let matchesPrice = true
    if (priceRange && priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      matchesPrice = listing.price >= min && listing.price <= max
    }
  
    return matchesSearch && matchesLocation && matchesQuality && matchesPrice
  })

  const handleSendInquiry = () => {
    if (!selectedListing || !inquiryMessage.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your inquiry message.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the inquiry to the farmer
    toast({
      title: "Inquiry sent!",
      description: `Your message has been sent to ${selectedListing.farmerName}.`,
    })
    
    setShowInquiryForm(false)
    setSelectedListing(null)
    setInquiryMessage('')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-600">Find quality rubber from verified farmers in Tripura</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Listings</TabsTrigger>
            <TabsTrigger value="favorites">Saved Farmers</TabsTrigger>
            <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <Input
                      id="search"
                      placeholder="Farmer name, rubber type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        <SelectItem value="agartala">Agartala</SelectItem>
                        <SelectItem value="udaipur">Udaipur</SelectItem>
                        <SelectItem value="kailashahar">Kailashahar</SelectItem>
                        <SelectItem value="belonia">Belonia</SelectItem>
                        <SelectItem value="khowai">Khowai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quality">Quality</Label>
                    <Select value={qualityFilter} onValueChange={setQualityFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All qualities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All qualities</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price Range</Label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All prices</SelectItem>
                        <SelectItem value="0-170">₹0-170/kg</SelectItem>
                        <SelectItem value="170-180">₹170-180/kg</SelectItem>
                        <SelectItem value="180-190">₹180-190/kg</SelectItem>
                        <SelectItem value="190-200">₹190+/kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Listings Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{listing.type}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {listing.farmerLocation}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        ₹{listing.price}/kg
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Farmer:</span>
                        <span className="font-medium">{listing.farmerName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <span className="font-medium">{listing.quantity} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Quality:</span>
                        <Badge variant="outline">{listing.quality}</Badge>
                      </div>
                      {listing.moisture > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Moisture:</span>
                          <span className="font-medium">{listing.moisture}%</span>
                        </div>
                      )}
                      {listing.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {listing.description}
                        </p>
                      )}
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedListing(listing)
                            setShowInquiryForm(true)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
                  <p className="text-gray-600">Try adjusting your search filters</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved farmers yet</h3>
                <p className="text-gray-600">Save farmers you frequently work with for quick access</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries sent yet</h3>
                <p className="text-gray-600">Your sent inquiries will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Inquiry Form Modal */}
        {showInquiryForm && selectedListing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Contact {selectedListing.farmerName}</CardTitle>
                <CardDescription>
                  Send an inquiry about {selectedListing.type} - {selectedListing.quantity}kg
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{selectedListing.farmerPhone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{selectedListing.farmerLocation}</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="inquiry">Your Message</Label>
                  <Textarea
                    id="inquiry"
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Hi, I'm interested in your rubber listing. Could you provide more details about..."
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSendInquiry} className="flex-1">
                    Send Inquiry
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowInquiryForm(false)
                      setSelectedListing(null)
                      setInquiryMessage('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
