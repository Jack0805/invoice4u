# Invoice Generator Frontend

A modern Next.js frontend application for creating and managing invoices.

## Features

- Create invoices with comprehensive form fields
- Real-time form validation
- View all created invoices in a grid layout
- Download invoices as PDF
- Delete invoices
- Responsive design with Tailwind CSS
- Type-safe with TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see parent README)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set the API URL (default: `http://localhost:3000`)

## Running the Application

### Development mode:
```bash
npm run dev
```

The application will start on `http://localhost:3001`

### Production build:
```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Home page (Create Invoice)
│   └── preview/
│       └── page.tsx         # Invoice preview page
├── components/
│   ├── forms/
│   │   └── InvoiceForm.tsx  # Invoice creation form
│   └── ui/
│       └── InvoiceCard.tsx  # Invoice display card
├── lib/
│   └── api.ts               # API client and types
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Usage

### Creating an Invoice

1. Navigate to the home page (`/`)
2. Fill in the "From" section with your company details
3. Fill in the "Bill To" section with client details
4. Add invoice items:
   - Description
   - Quantity
   - Unit Price
5. Add additional details:
   - Due Date
   - Currency
   - Tax Rate (%)
   - Discount amount
   - Notes
   - Terms & Conditions
6. Click "Preview Invoice →"
7. Review your invoice in the preview page
8. Click "Download PDF" to get your invoice
9. Click "Back to Edit" if you need to make changes

## API Integration

The frontend communicates with the backend API using Axios. All API calls are defined in `lib/api.ts`:

- `createInvoice(data)` - Create a new invoice
- `getAllInvoices()` - Get all invoices
- `getInvoiceById(id)` - Get single invoice
- `updateInvoice(id, data)` - Update invoice
- `deleteInvoice(id)` - Delete invoice
- `downloadInvoicePDF(id, invoiceNumber)` - Download PDF

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3000)

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hooks** - State management

## Development

### Adding New Fields

To add new fields to the invoice form:

1. Update the `Invoice` interface in `lib/api.ts`
2. Update the `InvoiceForm` component in `components/forms/InvoiceForm.tsx`
3. Add the corresponding form field UI

### Customizing Styles

The application uses Tailwind CSS. Customize the theme in `tailwind.config.ts`.

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure the backend is configured to accept requests from your frontend origin (default: http://localhost:3001).

### API Connection

If the frontend can't connect to the backend:
1. Verify the backend is running on the correct port
2. Check `.env.local` has the correct `NEXT_PUBLIC_API_URL`
3. Ensure there are no firewall/network issues

## Production Deployment

### Build the application:
```bash
npm run build
```

### Set production environment variables:
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### Deploy to your hosting platform:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker container

## License

ISC
