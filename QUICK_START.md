# Invoice Generator - Quick Start Guide

Get up and running in under 5 minutes!

## Prerequisites

- Node.js 20+ installed (check with `node --version`)
- npm installed (check with `npm --version`)

## Installation & Setup

### Option 1: Automated Setup (Recommended)

```bash
# Run the startup script
./start-dev.sh
```

This will:
- Check Node.js version
- Install all dependencies (backend & frontend)
- Create environment files
- Start both services

### Option 2: Manual Setup

**Step 1: Install Backend Dependencies**
```bash
npm install
```

**Step 2: Install Frontend Dependencies**
```bash
cd frontend
npm install
cd ..
```

**Step 3: Configure Environment**
```bash
# Backend
cp .env.example .env

# Frontend
cp frontend/.env.example frontend/.env.local
```

**Step 4: Start Services**

Terminal 1 (Backend):
```bash
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## Access the Application

Once both services are running:

- **Frontend UI**: http://localhost:3001
- **Backend API**: http://localhost:3000

## Create Your First Invoice

1. Open http://localhost:3001 in your browser
2. Fill in the form:
   - **From**: Your company details
   - **Bill To**: Client details
   - **Items**: Add invoice line items
   - **Additional Details**: Tax, discount, notes, etc.
3. Click "Create Invoice"
4. Download the PDF or view in the invoices list

## Verify Everything Works

### Test 1: Backend API
```bash
curl http://localhost:3000
```

Expected: JSON response with API information

### Test 2: Create Invoice via API
```bash
curl -X POST http://localhost:3000/api/invoices \
  -H "Content-Type: application/json" \
  -d '{"from":{"name":"Test Co","email":"test@test.com"},"to":{"name":"Client","email":"client@test.com"},"items":[{"description":"Service","quantity":1,"unitPrice":100}]}'
```

Expected: JSON response with created invoice

### Test 3: Frontend
Visit http://localhost:3001 - you should see the invoice creation form

## Common Issues & Fixes

### Issue: Node.js version too old
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node 20
nvm install 20
nvm use 20
```

### Issue: Port already in use
**Backend (3000):**
```bash
lsof -i :3000
kill -9 <PID>
```

**Frontend (3001):**
Next.js will automatically use next available port (3002, etc.)

### Issue: Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Same for frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend can't connect to backend
1. Verify backend is running: `curl http://localhost:3000`
2. Check `frontend/.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:3000`
3. Restart both services

## Project Structure at a Glance

```
invoice-maker/
├── src/              # Backend code
├── frontend/         # Frontend code
├── data/            # Invoice storage (JSON)
├── start-dev.sh     # Automated startup
└── README.md        # Full documentation
```

## Next Steps

- Read [README.md](README.md) for complete documentation
- Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup info
- Check [frontend/README.md](frontend/README.md) for frontend details
- Customize PDF template in `src/utils/pdfGenerator.js`
- Add your company logo and branding

## Support

Having issues? Check:
1. Node.js version is 20+
2. Both backend and frontend are running
3. No port conflicts
4. Dependencies are installed
5. Environment files exist

## That's It!

You now have a fully functional invoice generator! 🎉

Start creating professional invoices at http://localhost:3001
