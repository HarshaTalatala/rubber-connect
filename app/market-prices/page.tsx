import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, Calendar, MapPin } from 'lucide-react'

export default function MarketPricesPage() {
  const marketData = [
    {
      grade: 'RSS-1',
      description: 'Premium Grade - Ribbed Smoked Sheets',
      currentPrice: 187,
      previousPrice: 185,
      change: 2,
      trend: 'up',
      locations: [
        { name: 'Agartala', price: 187 },
        { name: 'Udaipur', price: 186 },
        { name: 'Kailashahar', price: 185 },
      ]
    },
    {
      grade: 'RSS-3',
      description: 'Standard Grade - Ribbed Smoked Sheets',
      currentPrice: 177,
      previousPrice: 178,
      change: -1,
      trend: 'down',
      locations: [
        { name: 'Agartala', price: 177 },
        { name: 'Belonia', price: 176 },
        { name: 'Khowai', price: 178 },
      ]
    },
    {
      grade: 'RSS-4',
      description: 'Commercial Grade - Ribbed Smoked Sheets',
      currentPrice: 167,
      previousPrice: 167,
      change: 0,
      trend: 'stable',
      locations: [
        { name: 'Agartala', price: 167 },
        { name: 'Udaipur', price: 166 },
        { name: 'Belonia', price: 168 },
      ]
    },
    {
      grade: 'Latex',
      description: 'Fresh Latex - Direct from Trees',
      currentPrice: 192,
      previousPrice: 190,
      change: 2,
      trend: 'up',
      locations: [
        { name: 'Agartala', price: 192 },
        { name: 'Kailashahar', price: 191 },
        { name: 'Khowai', price: 193 },
      ]
    },
    {
      grade: 'Cup Lump',
      description: 'Cup Lump - Coagulated Rubber',
      currentPrice: 155,
      previousPrice: 157,
      change: -2,
      trend: 'down',
      locations: [
        { name: 'Agartala', price: 155 },
        { name: 'Udaipur', price: 154 },
        { name: 'Belonia', price: 156 },
      ]
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Prices</h1>
          <p className="text-gray-600 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Last updated: {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹175.6/kg</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +1.2% from yesterday
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Highest Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹193/kg</div>
              <div className="text-sm text-gray-600">Fresh Latex - Khowai</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-gray-600">Across Tripura</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Price Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Bullish</div>
              <div className="text-sm text-gray-600">Demand increasing</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Price Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Rubber Prices in Tripura</CardTitle>
            <CardDescription>
              Real-time prices from major rubber markets across the state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {marketData.map((item) => (
                <div key={item.grade} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{item.grade}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₹{item.currentPrice}/kg</div>
                      <div className={`flex items-center justify-end text-sm ${getTrendColor(item.trend)}`}>
                        {getTrendIcon(item.trend)}
                        <span className="ml-1">
                          {item.change > 0 ? '+' : ''}{item.change} from yesterday
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {item.locations.map((location) => (
                      <div key={location.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium">{location.name}</span>
                        </div>
                        <Badge variant="secondary">₹{location.price}/kg</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Demand Surge</h4>
                    <p className="text-sm text-gray-600">
                      Increased demand from tire manufacturers driving prices up
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Seasonal Factor</h4>
                    <p className="text-sm text-gray-600">
                      Peak tapping season contributing to higher supply
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <MapPin className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Regional Variation</h4>
                    <p className="text-sm text-gray-600">
                      Khowai showing premium prices due to quality reputation
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Next Week</span>
                    <Badge variant="secondary" className="text-green-600">Bullish</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Expected 2-3% increase due to export demand
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Next Month</span>
                    <Badge variant="secondary" className="text-blue-600">Stable</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Prices likely to stabilize around current levels
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Monsoon Impact</span>
                    <Badge variant="secondary" className="text-yellow-600">Watch</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Weather conditions may affect supply in coming months
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price History Note */}
        <Card>
          <CardContent className="text-center py-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Need Historical Data?</h3>
            <p className="text-gray-600 mb-4">
              Access detailed price charts and historical trends with our premium analytics
            </p>
            <Badge variant="outline">Coming Soon</Badge>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
