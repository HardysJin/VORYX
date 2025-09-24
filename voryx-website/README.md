# VORYX - Beyond Reach 🏔️

A premium exploration website built with Next.js, inspired by luxury travel brands. Features cinematic design, smooth animations, and comprehensive expedition management.

![VORYX Preview](public/images/preview.png)

## ✨ Features

### Design & UX
- **Cinematic Dark Theme**: Elegant dark design with golden accents
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Premium Typography**: Inter font with careful spacing and hierarchy

### Technical Stack
- **Next.js 14**: Latest App Router with server components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom theme
- **Framer Motion**: High-performance animations and gestures
- **Lucide React**: Beautiful, consistent icon library

### Pages & Functionality
- **Home**: Cinematic hero with call-to-action sections
- **About**: Company philosophy, values, and team information
- **Routes**: Current and upcoming expeditions with detailed information
- **Atlas**: Archive of completed expeditions with timeline view
- **Science**: Research collaborations and scientific contributions
- **Articles**: Blog/journal with category filtering
- **Contact**: Application form with multi-step process

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone or download the project files
# Run the setup script
chmod +x setup.sh
./setup.sh

# Navigate to project directory
cd voryx-website

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run development with helper script
./scripts/dev.sh

# Build with helper script
./scripts/build.sh
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (pages)/           # Route groups
│   │   ├── about/         # About page
│   │   ├── routes/        # Expeditions listing
│   │   ├── atlas/         # Expedition archive
│   │   ├── science/       # Research collaborations
│   │   ├── articles/      # Blog/journal
│   │   └── contact/       # Contact/application
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Global loading component
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/
│   ├── layout/            # Navigation, Footer
│   └── ui/                # Reusable UI components
│       ├── Button.tsx     # Styled button component
│       ├── Card.tsx       # Card container
│       ├── Hero.tsx       # Hero section template
│       ├── Loading.tsx    # Loading spinner
│       └── Section.tsx    # Section wrapper
├── lib/
│   ├── data/              # Static data and types
│   │   ├── routes.ts      # Expedition data
│   │   └── articles.ts    # Blog articles data
│   ├── metadata.ts        # SEO and metadata helpers
│   └── utils.ts           # Utility functions
public/
├── images/                # Static images
├── videos/                # Video assets (optional)
└── README.md              # Asset placement guide
```

## 🎨 Customization

### Brand Colors
Update colors in `tailwind.config.ts`:

```typescript
'voryx': {
  'dark': '#0a0a0a',      // Deep black background
  'gray': '#1a1a1a',      // Dark gray sections
  'accent': '#d4af37',    // Golden accent color
  'light': '#f5f5f5',     // Light text/elements
}
```

### Typography
The project uses Inter font by default. Add display fonts in `src/app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })
```

### Content Management
Update content in the data files:
- **Expeditions**: `src/lib/data/routes.ts`
- **Articles**: `src/lib/data/articles.ts`

### Images
1. Add images to `public/images/`
2. Use Next.js Image component for optimization:

```tsx
import Image from 'next/image'

<Image
  src="/images/expedition-1.jpg"
  alt="Antarctic Expedition"
  width={1200}
  height={800}
  className="rounded-lg"
/>
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Mobile-first navigation with hamburger menu
- Flexible grid layouts that adapt to screen size
- Optimized typography scaling
- Touch-friendly interactive elements

## ⚡ Performance Optimizations

### Built-in Optimizations
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Font Optimization**: Preloaded Google Fonts
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination

### Recommended Additions
- **Analytics**: Google Analytics or Plausible
- **Monitoring**: Sentry for error tracking
- **CDN**: Cloudflare for global distribution

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms
- **Netlify**: Drag & drop `.next` folder after `npm run build`
- **AWS S3 + CloudFront**: Use `next export` for static export
- **DigitalOcean**: Deploy via App Platform
- **Railway**: Connect GitHub repository

### Environment Variables
Copy `.env.local.example` to `.env.local` and configure:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="Your Brand Name"

# Optional: Contact form endpoint
NEXT_PUBLIC_FORM_ENDPOINT=your_form_service_url

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🔧 Development Tools

### VS Code Extensions (Recommended)
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

### Useful Commands
```bash
# Type checking
npx tsc --noEmit

# Bundle analysis
npm install --save-dev @next/bundle-analyzer
npm run build-analyze

# Performance testing
npm install --save-dev lighthouse-ci
npx lhci autorun
```

## 🎯 SEO Features

- **Metadata Generation**: Dynamic meta tags for all pages
- **Open Graph**: Social media preview optimization
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions

## 🛠️ Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Module Not Found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Generate types
npx next build
```

### Performance Issues
- Use Next.js Image component for all images
- Implement lazy loading for heavy components
- Optimize Framer Motion animations
- Use dynamic imports for large libraries

## 📄 License

MIT License - Feel free to use this project as a foundation for your own luxury travel or exploration website.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🌟 Credits

- **Inspired by**: Black Tomato luxury travel aesthetic
- **Icons**: Lucide React icon library
- **Typography**: Google Fonts (Inter)
- **Animations**: Framer Motion

---

**Built with ❤️ for adventurers who dare to go Beyond Reach**
