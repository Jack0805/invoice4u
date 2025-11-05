# Invoice Generator - Complete Setup Guide

This guide will help you set up and run the complete Invoice Generator application (both backend and frontend).

## System Requirements

- **Node.js**: v20.9.0 or higher (recommended: latest LTS version)
- **npm**: v8.0.0 or higher
- **Operating System**: macOS, Linux, or Windows

## Installation Steps

### Step 1: Install Node.js (if needed)

If you're running Node.js v17 or lower, upgrade to v20+:

**Using nvm (recommended):**
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20
nvm use 20

# Verify installation
node --version  # Should show v20.x.x
```

**Or download directly:**
Visit https://nodejs.org/ and download the LTS version

### Step 2: Set Up the Backend

```bash
# Navigate to project root
cd invoice-maker

# Install backend dependencies
npm install

# Configure environment variables
cp .env.example .env

# (Optional) Edit .env if you need to change the port
# Default is PORT=3000
```

### Step 3: Set Up the Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# (Optional) Edit .env.local if your backend runs on a different port
# Default is NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Running the Application

### Option 1: Run Both Services in Separate Terminals

**Terminal 1 - Backend:**
```bash
# From project root
npm run dev
```

You should see:
```
Invoice Generator API running on port 3000
Environment: development
```

**Terminal 2 - Frontend:**
```bash
# From project root
cd frontend
npm run dev
```

You should see:
```
▲ Next.js 16.0.1
- Local:        http://localhost:3001
```

### Option 2: Using Background Processes

**Start Backend:**
```bash
# From project root
npm start &
```

**Start Frontend:**
```bash
# From project root
cd frontend
npm run dev
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:3001
```

## Verifying the Setup

### 1. Check Backend API

Open a new terminal and run:
```bash
curl http://localhost:3000
```

You should see a JSON response with API information.

### 2. Check Frontend

Visit `http://localhost:3001` in your browser. You should see the Invoice Generator interface.

### 3. Create a Test Invoice

1. Fill in the form with sample data
2. Click "Create Invoice"
3. Download the generated PDF

## Troubleshooting

### Backend Issues

**Problem: Port 3000 already in use**
```bash
# Find the process using port 3000
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or change the port in .env file
PORT=3001
```

**Problem: Module not found errors**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

**Problem: Port 3001 already in use**

Next.js will automatically try the next available port (3002, 3003, etc.)

**Problem: API connection errors**

1. Verify backend is running: `curl http://localhost:3000`
2. Check `.env.local` has correct API URL
3. Check browser console for CORS errors

**Problem: Build errors with Node.js version**
```bash
# Upgrade to Node.js 20+
nvm install 20
nvm use 20

# Or download from https://nodejs.org/
```

### Common Errors

**CORS Errors:**
- The backend already has CORS enabled
- Ensure backend is running before starting frontend
- Check that API_URL in frontend matches backend port

**PDF Generation Fails:**
- Ensure pdfkit package is installed in backend
- Check backend logs for errors
- Verify invoice data is complete

## Directory Structure Overview

```
invoice-maker/
├── backend/                    # Backend API (root level)
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── models/           # Data models
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Helper functions
│   │   └── server.js         # Entry point
│   ├── data/                 # JSON storage
│   └── package.json
│
└── frontend/                  # Next.js frontend
    ├── app/                  # Next.js app directory
    │   ├── page.tsx         # Create invoice page
    │   └── invoices/
    │       └── page.tsx     # View invoices page
    ├── components/          # React components
    ├── lib/                # Utilities and API client
    └── package.json
```

## Development Workflow

### Making Changes to Backend

1. Edit files in `src/` directory
2. If using `npm run dev`, changes auto-reload
3. Test API endpoints using curl or Postman

### Making Changes to Frontend

1. Edit files in `app/` or `components/` directories
2. Changes auto-reload in browser (Fast Refresh)
3. Check browser console for errors

## Production Deployment

### Backend Deployment

```bash
# Build and start
npm start

# Or use a process manager like PM2
npm install -g pm2
pm2 start src/server.js --name invoice-api
```

### Frontend Deployment

```bash
cd frontend

# Build for production
npm run build

# Start production server
npm start
```

**Recommended Platforms:**
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Heroku, Railway, DigitalOcean, AWS

## Next Steps

1. **Customize Invoice Template**: Edit `src/utils/pdfGenerator.js` to modify PDF layout
2. **Add Database**: Replace JSON storage with MongoDB or PostgreSQL
3. **Add Authentication**: Implement user login and multi-tenant support
4. **Email Integration**: Add functionality to email invoices to clients
5. **Payment Integration**: Connect to Stripe, PayPal, etc.

## Getting Help

- Check the README files in root and frontend directories
- Review API documentation in main README
- Check console/terminal for error messages

## Summary

Once setup is complete, you should have:
- ✅ Backend API running on http://localhost:3000
- ✅ Frontend UI running on http://localhost:3001
- ✅ Ability to create invoices via web interface
- ✅ PDF generation and download functionality
- ✅ Invoice management (view, delete)

Enjoy using your Invoice Generator! 🎉
