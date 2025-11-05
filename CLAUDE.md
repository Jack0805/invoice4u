# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Invoice Generator is a full-stack web application for creating and generating professional PDF invoices. The application is **stateless** - it does not persist invoice data. Users create invoices via a web form, preview them, and download PDFs on-demand.

**Key Architecture Points:**
- **Backend**: Node.js/Express REST API (port 3000)
- **Frontend**: Next.js 16 with TypeScript, React 19, Tailwind CSS 4 (port 3001)
- **State Management**: Redux Toolkit with redux-persist (localStorage)
- **PDF Generation**: PDFKit library (backend)
- **No Database**: Invoices are generated on-the-fly, not stored

## Development Commands

### Running the Application

**Backend (from project root):**
```bash
npm install          # Install backend dependencies
npm start            # Start production server
npm run dev          # Start with auto-reload (--watch flag)
```

**Frontend (from project root):**
```bash
cd frontend
npm install          # Install frontend dependencies
npm run dev          # Start Next.js dev server (http://localhost:3001)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run Next.js linter
```

**Quick Start (Both Services):**
```bash
./start-dev.sh       # Automated script to start both backend and frontend
```

### Testing the API

```bash
# Test backend is running
curl http://localhost:3000

# Test PDF generation endpoint
curl -X POST http://localhost:3000/api/invoices/generate \
  -H "Content-Type: application/json" \
  -d '{"from":{"name":"Test Co","email":"test@test.com"},"to":{"name":"Client","email":"client@test.com"},"items":[{"description":"Test","quantity":1,"unitPrice":100}],"currency":"USD"}' \
  -o test-invoice.pdf
```

## Architecture Details

### Request Flow (Stateless Design)

1. **Form Input** → User fills invoice form on homepage (`/`)
2. **Redux Storage** → Form data saved to Redux store + localStorage (browser-side persistence)
3. **Preview** → Navigate to `/preview` page, data loaded from Redux
4. **PDF Generation** → User clicks "Download PDF":
   - Frontend sends invoice data to `POST /api/invoices/generate`
   - Backend validates data using `Invoice` model
   - Backend generates PDF using PDFKit
   - PDF returned as blob and downloaded
   - **No data is stored on the server**

### Backend Structure (`src/`)

```
src/
├── server.js              # Express app entry point, middleware setup
├── routes/
│   └── invoiceRoutes.js   # Single route: POST /generate
├── controllers/
│   └── invoiceController.js  # Single method: generatePDF()
├── models/
│   └── Invoice.js         # Invoice class with validation & calculations
├── utils/
│   ├── pdfGenerator.js    # PDFKit PDF generation logic
│   └── dataStore.js       # (Legacy - not used in stateless mode)
└── middleware/
    └── errorHandler.js    # Global error handling
```

**Key Backend Files:**

- **`Invoice.js`**: Model class that auto-generates invoice numbers (`INV-YYYYMM-XXXX`), calculates subtotals/tax/totals, and validates required fields
- **`pdfGenerator.js`**: Creates professional PDF with header, company info (from/to), items table, and totals section
- **`invoiceController.js`**: Single endpoint validates invoice data and returns generated PDF

### Frontend Structure (`frontend/`)

```
frontend/
├── app/
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage: invoice creation form
│   ├── preview/page.tsx   # Preview invoice before download
│   ├── about/page.tsx     # Static pages
│   ├── faq/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── forms/
│   │   └── InvoiceForm.tsx    # Main invoice form with validation
│   └── Footer.tsx
├── lib/
│   ├── api.ts             # Axios API client, single method: generateInvoicePDF()
│   └── redux/
│       ├── store.ts       # Redux store with persist config
│       ├── invoiceSlice.ts    # Invoice form state management
│       ├── hooks.ts       # Typed Redux hooks
│       └── StoreProvider.tsx  # Client-side Redux provider
└── .env.local             # NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Key Frontend Patterns:**

- **Form State**: Managed by `invoiceSlice` with actions: `setFormData`, `updateFormField`, `resetForm`
- **Persistence**: Redux-persist saves form to localStorage so users don't lose data on refresh
- **API Communication**: Single API method `generateInvoicePDF(invoice)` posts to `/api/invoices/generate` with `responseType: 'blob'`
- **File Download**: Creates blob URL from PDF response and triggers browser download

### Invoice Data Model

```typescript
interface Invoice {
  // Auto-generated fields (backend)
  id?: string;                    // UUID
  invoiceNumber?: string;         // INV-YYYYMM-XXXX
  date?: string;                  // ISO date

  // Required fields
  from: CompanyInfo;              // Sender (name, email required)
  to: CompanyInfo;                // Client (name, email required)
  items: InvoiceItem[];           // At least 1 item required

  // Optional fields
  dueDate?: string;
  currency?: string;              // Default: 'USD'
  taxRate?: number;               // Percentage (0-100)
  discount?: number;              // Flat amount
  notes?: string;
  terms?: string;

  // Calculated fields (backend)
  subtotal?: number;              // Sum of all items
  taxAmount?: number;             // (subtotal - discount) * taxRate
  total?: number;                 // subtotal - discount + taxAmount
}
```

## Important Implementation Notes

### Stateless Architecture

The app was **recently refactored** to be stateless:
- ❌ **Removed**: `/invoices` page (listing all invoices)
- ❌ **Removed**: `InvoiceCard` component
- ❌ **Removed**: `dataStore.js` usage for persistence
- ✅ **Current**: Direct PDF generation without storage

**If adding storage back:**
- Backend has legacy `dataStore.js` (JSON file-based)
- Would need to add back GET/DELETE endpoints
- Would need to rebuild invoice listing UI

### PDF Generation

PDFKit generates PDFs in-memory:
- Uses streaming API (collects chunks into Buffer)
- Typical invoice PDF: 50-100 KB
- Layout: A4 page with 50pt margins
- Supports multi-page for long item lists

**Customizing PDF:**
Edit `src/utils/pdfGenerator.js`:
- Change colors: Search for `fillAndStroke('#f0f0f0', '#000000')`
- Modify layout: Adjust X/Y coordinates (e.g., `text('From:', 50, 150)`)
- Add logo: Use `doc.image(logoPath, x, y, { width, height })`

### Redux Persistence

Form data persists across browser sessions:
- Storage key: `persist:root`
- Whitelist: `['invoice']` slice only
- Clear data: `localStorage.clear()` or reset button

**To disable persistence:**
Remove `persistStore` and `persistReducer` from `store.ts`

### Environment Variables

**Backend (`.env`):**
```
PORT=3000
NODE_ENV=development
```

**Frontend (`frontend/.env.local`):**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important:** Must restart servers after changing environment variables.

### CORS Configuration

Backend has CORS enabled for all origins (development):
```javascript
app.use(cors());  // src/server.js
```

For production, restrict to your frontend domain:
```javascript
app.use(cors({ origin: 'https://yourdomain.com' }));
```

## Common Development Tasks

### Adding a New Currency

1. Frontend: Add to `<select>` in `InvoiceForm.tsx` (line ~293)
2. Backend: No changes needed (accepts any currency string)

### Customizing Invoice Number Format

Edit `Invoice.js` `generateInvoiceNumber()` method (line 49):
```javascript
// Current: INV-202511-0123
// Change to: INV-2025-001
return `INV-${year}-${random}`;
```

### Adding Form Validation

Frontend validation is minimal (HTML5 `required` attributes). For complex validation:
1. Add validation to `InvoiceForm.tsx` in `handleSubmit`
2. Backend validates in `Invoice.validate()` method

### Debugging PDF Generation Issues

1. Check backend logs for errors
2. Verify invoice data structure matches `Invoice` model
3. Test endpoint directly with curl (see Testing section)
4. PDFKit errors often relate to font paths or coordinates going off-page

## Deployment Considerations

The DEPLOYMENT.md suggests Vercel, but **current architecture requires separate deployments**:

**Option 1: Two Services**
- Frontend → Vercel (Next.js native)
- Backend → Railway/Render (Node.js with persistent runtime)

**Option 2: Vercel Serverless Functions**
- Convert `pdfGenerator.js` to Next.js API route (`app/api/invoices/generate/route.ts`)
- Install pdfkit in frontend package.json
- Delete backend entirely
- This would be fully serverless and 100% free on Vercel

**Current limitation:** PDFKit requires Node.js runtime, so Vercel Edge Functions won't work (use Node.js runtime).

## Tech Stack Versions

- **Node.js**: 20+ (Next.js 16 requirement)
- **Next.js**: 16.0.1 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 4.1.16
- **Express**: 5.1.0
- **PDFKit**: 0.17.2

## Known Issues & Quirks

1. **Next.js Port**: Frontend auto-increments if 3001 is taken (3002, 3003, etc.)
2. **File Upload**: Not implemented - logo/images must be added manually to PDF code
3. **Currency Symbols**: Frontend displays currency code (USD), not symbol ($)
4. **Date Format**: Backend stores ISO strings, frontend displays localized dates
5. **Invoice Numbering**: Random suffix means duplicates are possible (very rare)
