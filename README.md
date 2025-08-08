# RubberConnect

A comprehensive platform connecting Tripura's rubber farmers directly with buyers, eliminating middlemen and ensuring fair pricing.

## 🌟 Features

### For Farmers
- **Profile Management**: Create detailed farmer profiles with farm location and experience
- **Rubber Listings**: List rubber stock with quality details, quantity, and pricing
- **Buyer Inquiries**: Receive and manage direct inquiries from verified buyers
- **Market Insights**: Access real-time market prices and trends

### For Buyers
- **Advanced Search**: Find farmers by location, quality grade, and price range
- **Direct Contact**: Connect directly with farmers through the platform
- **Quality Information**: Access detailed quality metrics and farmer profiles
- **Market Data**: Stay updated with current market prices across Tripura

### General Features
- **Real-time Market Prices**: Updated pricing information for all rubber grades
- **Mobile Responsive**: Optimized for mobile devices with touch-friendly interface
- **Secure Authentication**: JWT-based authentication system
- **Contact & Support**: Comprehensive support system with FAQ

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: JWT-based auth with local storage
- **State Management**: React Context API
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/rubberconnect.git
   cd rubberconnect
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to \`http://localhost:3000\`

## 🏗️ Project Structure

\`\`\`
rubberconnect/
├── app/                          # Next.js App Router
│   ├── buyer/dashboard/          # Buyer dashboard
│   ├── farmer/dashboard/         # Farmer dashboard
│   ├── login/                    # Authentication pages
│   ├── register/
│   ├── market-prices/            # Market prices page
│   ├── contact/                  # Contact & support
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── auth-provider.tsx         # Authentication context
│   ├── header.tsx                # Navigation header
│   └── footer.tsx                # Site footer
└── hooks/                        # Custom React hooks
    └── use-toast.ts              # Toast notifications
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary Green**: \`#059669\` - Represents agriculture and growth
- **Secondary**: Warm browns and earth tones
- **Accent**: Fresh yellows for highlights
- **Neutral**: Clean grays for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

## 📱 Mobile Responsiveness

The application is built mobile-first with:
- Touch-friendly button sizes (minimum 44px)
- Responsive grid layouts
- Collapsible navigation for mobile
- Optimized forms for mobile input

## 🔐 Authentication

Current implementation uses mock authentication with local storage:
- User data stored in browser local storage
- Session persistence across page reloads
- Role-based access (farmer/buyer)

**For Production**: Replace with proper backend authentication using:
- JWT tokens with secure HTTP-only cookies
- Password hashing (bcrypt)
- Email verification
- Password reset functionality

## 📊 Data Management

Currently uses mock data and local storage:
- Farmer profiles and listings
- Market price data
- User inquiries and messages

**For Production**: Integrate with:
- PostgreSQL/MySQL database
- Real-time market price APIs
- File storage for images (AWS S3/Cloudinary)

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Environment Variables

For production deployment, set up:
\`\`\`env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
DATABASE_URL=your-database-url
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for Tripura's rubber farming community
- Inspired by the need for fair trade and transparent pricing
- Thanks to all farmers and buyers who provided feedback

## 📞 Support

For support and questions:
- Email: support@rubberconnect.in
- Phone: +91 9876543210
- Address: Agartala, West Tripura, Tripura 799001

---

**Made with ❤️ for Tripura's rubber farmers**
\`\`\`
