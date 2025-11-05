# Deployment Guide for Invoice Generator

This guide will help you deploy your Invoice Generator application for **FREE** using Vercel.

## Overview

The app is now a **single Next.js application** with:
- Frontend pages (React/Next.js)
- Backend API routes (Next.js API Routes)
- No separate backend server needed!

## Prerequisites

1. GitHub account (free)
2. Vercel account (free) - Sign up at [vercel.com](https://vercel.com)

## Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository (if not already done)

```bash
cd /Users/user/invoice-maker
git init
git add .
git commit -m "Initial commit - Invoice Generator"
```

### 1.2 Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `invoice-generator` (or any name you prefer)
3. Don't initialize with README (we already have files)
4. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/invoice-generator.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Connect Vercel to GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your `invoice-generator` repository

### 2.2 Configure Project

**Important Settings:**

- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 2.3 Environment Variables

No environment variables needed! Everything works out of the box.

### 2.4 Deploy

Click "Deploy" and wait 2-3 minutes. Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy to a free `.vercel.app` domain

## Step 3: Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Domains
3. Add your custom domain (requires DNS configuration)

## Free Tier Limits

Vercel Free Tier includes:
- ✅ Unlimited personal projects
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Automatic deployments on git push
- ✅ Serverless functions (API routes)
- ✅ Global CDN

This is **more than enough** for a free invoice generator!

## Project Structure

```
invoice-maker/
├── frontend/              # Next.js application
│   ├── app/              # App router pages
│   │   ├── api/          # API routes (backend)
│   │   │   └── invoices/
│   │   │       └── route.ts  # PDF generation endpoint
│   │   ├── about/
│   │   ├── faq/
│   │   ├── preview/
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   ├── lib/             # Redux, API client, utilities
│   └── package.json
└── src/                 # Old backend (no longer needed!)
```

## How It Works

1. **User fills form** → Saved in Redux + localStorage (browser)
2. **User clicks "Preview"** → Navigate to preview page
3. **User clicks "Download PDF"** →
   - Invoice data sent to `/api/invoices` (Vercel serverless function)
   - PDF generated on-the-fly using PDFKit
   - PDF returned to browser
   - Invoice data is **NOT stored** anywhere

## Continuous Deployment

Every time you push to GitHub, Vercel will:
1. Automatically detect changes
2. Build a preview deployment
3. Deploy to production (on main branch)

```bash
# Make changes
git add .
git commit -m "Update invoice template"
git push

# Vercel automatically deploys!
```

## Monitoring

View your deployment stats at:
- Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Analytics: Check bandwidth usage, visitor stats
- Logs: View function execution logs

## Cost Analysis

**Current setup costs: $0/month**

- Vercel Hosting: Free (100 GB bandwidth included)
- Domain (optional): ~$12/year if you buy one
- SSL Certificate: Free (included)
- Database: Not needed (no storage)

## Troubleshooting

### Build Fails

If build fails, check:
1. All dependencies are in `frontend/package.json`
2. Root directory is set to `frontend`
3. Node version compatibility (Vercel uses Node 18 by default)

### API Route Not Working

If PDF generation fails:
1. Check function logs in Vercel dashboard
2. Ensure `pdfkit` is in dependencies (not devDependencies)
3. Verify API route path: `/api/invoices`

### Large PDF Files

PDFKit generates efficient PDFs, but if files are too large:
- Vercel free tier has 50MB response limit
- Typical invoice PDF: 50-100 KB (well within limits)

## Next Steps

1. **Custom Domain**: Add your own domain (optional)
2. **Analytics**: Add Vercel Analytics for visitor tracking
3. **SEO**: Update metadata in `app/layout.tsx`
4. **Logo**: Add your logo to the invoice template

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Issues: Report bugs in your repository

---

**🎉 Congratulations!** Your invoice generator is now live and free forever on Vercel!
