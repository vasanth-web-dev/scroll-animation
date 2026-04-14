# 🚀 Deployment Guide

This guide covers deploying your scroll-driven hero section to popular hosting platforms.

---

## 📦 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Project builds successfully (`npm run build`)
- [ ] No console errors in production mode
- [ ] All animations work smoothly
- [ ] Responsive design tested
- [ ] Images optimized
- [ ] Environment variables configured (if any)
- [ ] README updated with live demo link

---

## 🔷 Option 1: Deploy to Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic deployments
- Free for personal projects
- Global CDN
- Custom domains

### Method A: Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd scroll-hero-animation
vercel
```

4. **Follow the prompts**
```
? Set up and deploy? Yes
? Which scope? Your username
? Link to existing project? No
? What's your project's name? scroll-hero-animation
? In which directory is your code? ./
? Want to override settings? No
```

5. **Production Deployment**
```bash
vercel --prod
```

### Method B: Vercel GitHub Integration

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/scroll-hero-animation.git
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your GitHub repository
- Click "Deploy"

3. **Automatic Deployments**
- Every push to main → Auto-deploy
- Pull requests → Preview deployments
- Custom domains supported

**Your live URL**: `https://scroll-hero-animation.vercel.app`

---

## 🟢 Option 2: Deploy to Netlify

**Why Netlify?**
- Easy drag-and-drop deployment
- Continuous deployment from Git
- Free SSL certificates
- Form handling
- Serverless functions

### Method A: Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build your project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy
```

4. **Production Deploy**
```bash
netlify deploy --prod
```

### Method B: Netlify Drop

1. **Build the project**
```bash
npm run build
```

2. **Visit Netlify**
- Go to [app.netlify.com/drop](https://app.netlify.com/drop)

3. **Drag and drop**
- Drag your `.next` folder
- Wait for deployment
- Get your live URL

### Method C: GitHub Integration

1. **Push to GitHub** (same as Vercel)

2. **Connect to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "Add new site"
- Choose "Import from Git"
- Select your repository

3. **Build Settings**
```
Build command: npm run build
Publish directory: .next
```

---

## 🔶 Option 3: GitHub Pages

**Note**: GitHub Pages doesn't natively support Next.js SSR. We'll use static export.

### Setup Steps

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/scroll-hero-animation',
  assetPrefix: '/scroll-hero-animation/',
}

module.exports = nextConfig
```

3. **Update package.json**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export",
    "deploy": "npm run export && gh-pages -d out"
  }
}
```

4. **Add .nojekyll file**
```bash
touch public/.nojekyll
```

5. **Deploy**
```bash
npm run deploy
```

6. **Enable GitHub Pages**
- Go to repository settings
- Pages section
- Source: gh-pages branch
- Save

**Your live URL**: `https://yourusername.github.io/scroll-hero-animation`

---

## 🔵 Option 4: Render

1. **Create render.yaml**
```yaml
services:
  - type: web
    name: scroll-hero-animation
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
```

2. **Push to GitHub**

3. **Deploy on Render**
- Go to [render.com](https://render.com)
- New Web Service
- Connect repository
- Deploy

---

## 🟣 Option 5: Railway

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login**
```bash
railway login
```

3. **Initialize**
```bash
railway init
```

4. **Deploy**
```bash
railway up
```

---

## 🌐 Custom Domain Setup

### For Vercel

1. **Go to Project Settings**
2. **Domains tab**
3. **Add domain**: `yourdomain.com`
4. **Update DNS records**:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For Netlify

1. **Domain Settings**
2. **Add custom domain**
3. **Update nameservers** or add DNS records:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## 🔒 Environment Variables

If you add API keys later:

### Vercel
```bash
vercel env add API_KEY production
```

Or in dashboard:
- Settings → Environment Variables
- Add key-value pairs

### Netlify
- Site settings → Environment variables
- Add variables

### Local Development
Create `.env.local`:
```
NEXT_PUBLIC_API_KEY=your_key_here
```

---

## 📊 Performance Optimization for Production

### 1. Enable Compression

**Vercel** (automatic)
**Netlify** - Add `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### 2. Optimize Images

```javascript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/car.png"
  width={200}
  height={100}
  alt="Car"
  priority
/>
```

### 3. Enable Caching

Headers already set by Next.js, but you can customize:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

---

## 🐛 Deployment Troubleshooting

### Build Fails

**Error**: Module not found
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error**: Out of memory
```bash
# Solution: Increase Node memory
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

### GSAP Not Working in Production

**Issue**: GSAP animations don't work after deployment

**Solution**: Ensure proper import
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

### Images Not Loading

**Issue**: Images show 404 in production

**Solution**: Check image paths
```javascript
// Use public folder
<img src="/car.svg" />  // ✅ Correct

// Don't use absolute paths
<img src="./images/car.svg" />  // ❌ Wrong
```

### Fonts Not Loading

**Issue**: Custom fonts don't appear

**Solution**: Verify Google Fonts import in globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
```

---

## 📱 Progressive Web App (PWA) Setup (Optional)

1. **Install next-pwa**
```bash
npm install next-pwa
```

2. **Update next.config.js**
```javascript
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // Your config
})
```

3. **Create manifest.json**
```json
{
  "name": "Scroll Hero Animation",
  "short_name": "ScrollHero",
  "description": "Professional scroll-driven animations",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#00d9ff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 📈 Analytics Setup (Optional)

### Google Analytics

1. **Get tracking ID** from analytics.google.com

2. **Create** `app/layout.jsx` Script:
```jsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads correctly
- [ ] All animations work
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Images load properly
- [ ] Fonts display correctly
- [ ] HTTPS is enabled
- [ ] Custom domain works (if set)
- [ ] Performance score > 90 (Lighthouse)
- [ ] SEO metadata present

---

## 🎓 Quick Reference

| Platform | Build Time | Free Tier | SSL | CDN | Custom Domain |
|----------|-----------|-----------|-----|-----|---------------|
| Vercel | 1-2 min | ✅ Yes | ✅ Auto | ✅ Yes | ✅ Free |
| Netlify | 2-3 min | ✅ Yes | ✅ Auto | ✅ Yes | ✅ Free |
| GitHub Pages | 3-5 min | ✅ Yes | ✅ Auto | ❌ No | ✅ Free |
| Render | 5-8 min | ✅ Yes | ✅ Auto | ✅ Yes | 💰 Paid |
| Railway | 3-4 min | ✅ Yes | ✅ Auto | ✅ Yes | 💰 Paid |

---

## 🎉 You're Live!

After successful deployment:

1. **Update README** with live demo link
2. **Share on social media**
3. **Add to portfolio**
4. **Submit for internship review**

---

**Happy Deploying! 🚀**
