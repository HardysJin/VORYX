# VORYX Development Guide 🧭

## Pre-Development Checklist

### Initial Setup
- [ ] Run `./setup.sh` to create project structure
- [ ] Install dependencies: `npm install`
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Add your environment variables to `.env.local`
- [ ] Test development server: `npm run dev`

### Asset Preparation
- [ ] Add hero background image to `public/images/hero-bg.jpg`
- [ ] Add expedition images to `public/images/expedition-*.jpg`
- [ ] Add team photo to `public/images/team.jpg`
- [ ] Create favicon set in `public/images/`
- [ ] Add logo files to `public/images/logo-*.png`

## Development Workflow

### Daily Development
```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Format code
npm run format

# Lint code
npm run lint
```

### Before Committing
```bash
# Type check
npm run type-check

# Lint and format
npm run lint
npm run format-check

# Test build
npm run build
```

## Content Management

### Adding New Expeditions
1. Edit `src/lib/data/routes.ts`
2. Add new route object with all required fields
3. Add expedition image to `public/images/`
4. Update route detail pages if needed

### Adding New Articles
1. Edit `src/lib/data/articles.ts`
2. Add new article object
3. Set `featured: true` for featured articles
4. Add article image to `public/images/`

### Updating Site Content
- **Company info**: `src/app/about/page.tsx`
- **Contact details**: `src/app/contact/page.tsx`  
- **Navigation**: `src/components/layout/Navigation.tsx`
- **Footer**: `src/components/layout/Footer.tsx`

## Customization Guide

### Colors & Branding
- Update colors in `tailwind.config.ts`
- Change logo in navigation component
- Update brand name throughout the site
- Modify accent color in CSS variables

### Layout & Design
- Hero sections: Use `Hero` component from `src/components/ui/Hero.tsx`
- Page sections: Use `Section` component for consistent spacing
- Cards: Use `Card` component for content containers
- Buttons: Use `Button` component for consistency

### Performance Optimization
- Use Next.js `Image` component for all images
- Implement lazy loading for heavy components
- Optimize Framer Motion animations
- Use dynamic imports for large dependencies

## Common Tasks

### Adding a New Page
1. Create folder in `src/app/new-page/`
2. Create `page.tsx` with page component
3. Add route to navigation
4. Generate metadata for SEO
5. Test responsive design

### Custom Components
1. Create component in `src/components/ui/`
2. Use TypeScript for props interface
3. Style with Tailwind classes
4. Add Framer Motion animations if needed
5. Export from component index

### Styling Guidelines
- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing (4px grid)
- Use semantic color names
- Keep animations subtle and purposeful

## Testing

### Manual Testing Checklist
- [ ] Test all navigation links
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Check form submissions
- [ ] Test animation performance
- [ ] Validate loading states
- [ ] Check 404 and error pages

### Performance Testing
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:3000

# Bundle analysis
npm run analyze
```

## Deployment

### Pre-Deployment Checklist
- [ ] Update environment variables for production
- [ ] Test production build locally: `npm run build && npm start`
- [ ] Verify all images and assets are optimized
- [ ] Check SEO metadata
- [ ] Test contact form functionality
- [ ] Validate analytics integration

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set up custom domain
4. Configure redirects if needed
5. Monitor performance metrics

## Troubleshooting

### Common Issues
- **Build failures**: Check TypeScript errors, missing dependencies
- **Image optimization**: Ensure images are in public/images/
- **Animation performance**: Reduce motion on mobile devices
- **Font loading**: Preload critical fonts in layout

### Debug Tips
- Use React Developer Tools
- Check browser console for errors
- Monitor Network tab for performance
- Use Lighthouse for optimization suggestions

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Tools
- [Figma](https://figma.com) - Design and prototyping
- [Unsplash](https://unsplash.com) - High-quality stock photos
- [Tinify](https://tinypng.com) - Image compression
- [Google PageSpeed](https://pagespeed.web.dev) - Performance testing
