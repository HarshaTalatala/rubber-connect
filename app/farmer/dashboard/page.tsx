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
import { Plus, MapPin, Package, TrendingUp, MessageSquare } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface RubberListing {
  id: string
  type: string
  quantity: number
  quality: string
  moisture: number
  price: number
  description: string
  createdAt: string
}

interface Inquiry {
  id: string
  buyerName: string
  buyerEmail: string
  message: string
  listingId: string
  createdAt: string
}

export default function FarmerDashboard() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  
  const [profile, setProfile] = useState({
    farmLocation: '',
    farmSize: '',
    experience: '',
    phone: '',
  })
  
  // Dummy data for new users
  const dummyListings: RubberListing[] = [
    {
      id: '1',
      type: 'RSS-1',
      quantity: 300,
      quality: 'Premium',
      moisture: 0.6,
      price: 180,
      description: 'Premium RSS-1 rubber sheets, sun-dried and clean.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: '2',
      type: 'RSS-3',
      quantity: 200,
      quality: 'Standard',
      moisture: 0.8,
      price: 165,
      description: 'Standard RSS-3 sheets, suitable for bulk buyers.',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ]

  const dummyInquiries: Inquiry[] = [
    {
      id: 'inq1',
      buyerName: 'Amit Sharma',
      buyerEmail: 'amit.buyer@example.com',
      message: 'Is your RSS-1 stock available for immediate delivery?',
      listingId: '1',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'inq2',
      buyerName: 'Priya Das',
      buyerEmail: 'priya.das@example.com',
      message: 'Can you offer a discount for bulk purchase of RSS-3?',
      listingId: '2',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
  ]

  const [listings, setListings] = useState<RubberListing[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [showAddListing, setShowAddListing] = useState(false)
  
  const [newListing, setNewListing] = useState({
    type: '',
    quantity: '',
    quality: '',
    moisture: '',
    price: '',
    description: '',
  })

  useEffect(() => {
    if (!user || user.type !== 'farmer') {
      router.push('/login')
      return
    }
    
    // Load saved data only on client side
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem(`farmer_profile_${user.id}`)
      const savedListings = localStorage.getItem(`farmer_listings_${user.id}`)
      const savedInquiries = localStorage.getItem(`farmer_inquiries_${user.id}`)

      if (savedProfile) setProfile(JSON.parse(savedProfile))
      if (savedListings) {
        setListings(JSON.parse(savedListings))
      } else {
        setListings(dummyListings)
      }
      if (savedInquiries) {
        setInquiries(JSON.parse(savedInquiries))
      } else {
        setInquiries(dummyInquiries)
      }
    }
  }, [user, router])

  const handleProfileUpdate = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`farmer_profile_${user?.id}`, JSON.stringify(profile))
    }
    updateProfile(profile)
    toast({
      title: "Profile updated!",
      description: "Your farmer profile has been saved successfully.",
    })
  }

  const handleAddListing = () => {
    if (!newListing.type || !newListing.quantity || !newListing.quality || !newListing.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const listing: RubberListing = {
      id: Math.random().toString(36).substr(2, 9),
      type: newListing.type,
      quantity: parseFloat(newListing.quantity),
      quality: newListing.quality,
      moisture: parseFloat(newListing.moisture) || 0,
      price: parseFloat(newListing.price),
      description: newListing.description,
      createdAt: new Date().toISOString(),
    }

    const updatedListings = [...listings, listing]
    setListings(updatedListings)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`farmer_listings_${user?.id}`, JSON.stringify(updatedListings))
    }
    
    setNewListing({
      type: '',
      quantity: '',
      quality: '',
      moisture: '',
      price: '',
      description: '',
    })
    setShowAddListing(false)
    
    toast({
      title: "Listing added!",
      description: "Your rubber listing is now live for buyers to see.",
    })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{listings.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total rubber listings
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inquiries.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Buyer inquiries received
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{listings.length > 0 ? Math.round(listings.reduce((sum, l) => sum + l.price, 0) / listings.length) : 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Per kg average
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Market Prices</CardTitle>
                <CardDescription>Current rubber prices in Tripura markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>RSS-1 (Premium)</span>
                    <Badge variant="secondary">₹185-190/kg</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>RSS-3 (Standard)</span>
                    <Badge variant="secondary">₹175-180/kg</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>RSS-4 (Commercial)</span>
                    <Badge variant="secondary">₹165-170/kg</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farmer Profile</CardTitle>
                <CardDescription>Update your farm information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmLocation">Farm Location</Label>
                    <Input
                      id="farmLocation"
                      value={profile.farmLocation}
                      onChange={(e) => setProfile({...profile, farmLocation: e.target.value})}
                      placeholder="e.g., Agartala, West Tripura"
                    />
                  </div>
                  <div>
                    <Label htmlFor="farmSize">Farm Size (acres)</Label>
                    <Input
                      id="farmSize"
                      value={profile.farmSize}
                      onChange={(e) => setProfile({...profile, farmSize: e.target.value})}
                      placeholder="e.g., 5.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={profile.experience}
                      onChange={(e) => setProfile({...profile, experience: e.target.value})}
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      placeholder="e.g., +91 9876543210"
                    />
                  </div>
                </div>
                <Button onClick={handleProfileUpdate}>Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Rubber Listings</h2>
              <Button onClick={() => setShowAddListing(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Listing
              </Button>
            </div>

            {showAddListing && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Rubber Listing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Rubber Type</Label>
                      <Select value={newListing.type} onValueChange={(value) => setNewListing({...newListing, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rubber type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RSS-1">RSS-1 (Premium)</SelectItem>
                          <SelectItem value="RSS-3">RSS-3 (Standard)</SelectItem>
                          <SelectItem value="RSS-4">RSS-4 (Commercial)</SelectItem>
                          <SelectItem value="Latex">Fresh Latex</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity (kg)</Label>
                      <Input
                        id="quantity"
                        value={newListing.quantity}
                        onChange={(e) => setNewListing({...newListing, quantity: e.target.value})}
                        placeholder="e.g., 500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quality">Quality Grade</Label>
                      <Select value={newListing.quality} onValueChange={(value) => setNewListing({...newListing, quality: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="moisture">Moisture Content (%)</Label>
                      <Input
                        id="moisture"
                        value={newListing.moisture}
                        onChange={(e) => setNewListing({...newListing, moisture: e.target.value})}
                        placeholder="e.g., 0.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price per kg (₹)</Label>
                      <Input
                        id="price"
                        value={newListing.price}
                        onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                        placeholder="e.g., 180"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newListing.description}
                      onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                      placeholder="Additional details about your rubber..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddListing}>Add Listing</Button>
                    <Button variant="outline" onClick={() => setShowAddListing(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {listings.map((listing) => (
                <Card key={listing.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{listing.type}</CardTitle>
                        <CardDescription>{listing.quantity} kg available</CardDescription>
                      </div>
                      <Badge variant="secondary">₹{listing.price}/kg</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Quality:</span>
                        <span className="text-sm font-medium">{listing.quality}</span>
                      </div>
                      {listing.moisture > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Moisture:</span>
                          <span className="text-sm font-medium">{listing.moisture}%</span>
                        </div>
                      )}
                      {listing.description && (
                        <p className="text-sm text-gray-600 mt-2">{listing.description}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Listed on {new Date(listing.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {listings.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                  <p className="text-gray-600 mb-4">Start by adding your first rubber listing</p>
                  <Button onClick={() => setShowAddListing(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Listing
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <h2 className="text-2xl font-bold">Buyer Inquiries</h2>
            
            {inquiries.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
                  <p className="text-gray-600">Buyers will contact you through your listings</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <Card key={inquiry.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{inquiry.buyerName}</CardTitle>
                          <CardDescription>{inquiry.buyerEmail}</CardDescription>
                        </div>
                        <Badge variant="outline">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{inquiry.message}</p>
                      <div className="mt-4">
                        <Button size="sm">Reply</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
