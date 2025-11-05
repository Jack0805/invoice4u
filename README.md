# Invoice Generator - Full Stack Application

A complete invoice generation system with a Node.js/Express backend and Next.js frontend for creating, managing, and generating professional PDF invoices.

## Architecture

This project consists of two main components:

1. **Backend** - Node.js/Express REST API (Port 3000)
2. **Frontend** - Next.js React application (Port 3001)

## Quick Start

### 1. Start the Backend API

```bash
# Install dependencies
npm install

# Start the server
npm start
# or for development with auto-reload
npm run dev
```

The API will be running at `http://localhost:3000`

### 2. Start the Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running at `http://localhost:3001`

### 3. Access the Application

Open your browser and navigate to `http://localhost:3001`

## Features

### Frontend Features

- Modern, responsive user interface
- Create invoices with comprehensive form
- Real-time form validation
- View all invoices in a grid layout
- Download invoices as PDF
- Delete invoices
- Built with Next.js, TypeScript, and Tailwind CSS

### Backend Features

- Create, read, update, and delete invoices
- Generate PDF invoices
- Automatic invoice numbering
- Support for multiple items per invoice
- Tax and discount calculations
- JSON file-based storage (easy to migrate to a database)
- RESTful API design

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone or navigate to the project directory:
```bash
cd invoice-maker
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` file as needed.

## Running the Application

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your .env file).

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Get API Information
```
GET /
```

#### 2. Create Invoice
```
POST /api/invoices
Content-Type: application/json

{
  "from": {
    "name": "Your Company",
    "email": "company@example.com",
    "address": "123 Business St, City, State 12345",
    "phone": "+1 234 567 8900",
    "taxId": "TAX123456"
  },
  "to": {
    "name": "Client Name",
    "email": "client@example.com",
    "address": "456 Client Ave, City, State 67890",
    "phone": "+1 234 567 8901"
  },
  "items": [
    {
      "description": "Web Development Services",
      "quantity": 40,
      "unitPrice": 75.00
    },
    {
      "description": "Design Consultation",
      "quantity": 5,
      "unitPrice": 100.00
    }
  ],
  "dueDate": "2025-12-31",
  "currency": "USD",
  "taxRate": 10,
  "discount": 50,
  "notes": "Thank you for your business!",
  "terms": "Payment due within 30 days"
}
```

#### 3. Get All Invoices
```
GET /api/invoices
```

#### 4. Get Invoice by ID
```
GET /api/invoices/:id
```

#### 5. Update Invoice
```
PUT /api/invoices/:id
Content-Type: application/json

{
  "status": "paid"
}
```

#### 6. Delete Invoice
```
DELETE /api/invoices/:id
```

#### 7. Download Invoice PDF
```
GET /api/invoices/:id/pdf
```

## Invoice Data Model

```javascript
{
  "id": "uuid",
  "invoiceNumber": "INV-202511-1234",
  "date": "2025-11-05T00:00:00.000Z",
  "dueDate": "2025-12-31T00:00:00.000Z",
  "status": "draft", // draft, sent, paid, overdue
  "from": {
    "name": "Company Name",
    "email": "company@example.com",
    "address": "Business Address",
    "phone": "Phone Number",
    "taxId": "Tax ID"
  },
  "to": {
    "name": "Client Name",
    "email": "client@example.com",
    "address": "Client Address",
    "phone": "Phone Number",
    "taxId": "Tax ID"
  },
  "items": [
    {
      "description": "Item description",
      "quantity": 1,
      "unitPrice": 100.00
    }
  ],
  "currency": "USD",
  "taxRate": 10,
  "discount": 0,
  "subtotal": 100.00,
  "taxAmount": 10.00,
  "total": 110.00,
  "notes": "Optional notes",
  "terms": "Optional terms and conditions",
  "createdAt": "2025-11-05T00:00:00.000Z",
  "updatedAt": "2025-11-05T00:00:00.000Z"
}
```

## Project Structure

```
invoice-maker/
├── frontend/              # Next.js Frontend
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Create invoice page
│   │   └── invoices/
│   │       └── page.tsx   # View invoices page
│   ├── components/
│   │   ├── forms/
│   │   │   └── InvoiceForm.tsx
│   │   └── ui/
│   │       └── InvoiceCard.tsx
│   ├── lib/
│   │   └── api.ts         # API client
│   ├── .env.local
│   └── package.json
├── data/                  # JSON file storage
│   └── invoices.json      # Invoice data
├── src/                   # Backend API
│   ├── controllers/       # Route controllers
│   │   └── invoiceController.js
│   ├── middleware/        # Express middleware
│   │   └── errorHandler.js
│   ├── models/           # Data models
│   │   └── Invoice.js
│   ├── routes/           # API routes
│   │   └── invoiceRoutes.js
│   ├── utils/            # Utility functions
│   │   ├── dataStore.js  # File-based storage
│   │   └── pdfGenerator.js # PDF generation
│   └── server.js         # App entry point
├── .env                  # Backend environment variables
├── .env.example
├── package.json          # Backend dependencies
└── README.md
```

## Example Usage

### Using the Web Interface (Recommended)

1. Make sure both backend and frontend are running
2. Open `http://localhost:3001` in your browser
3. Fill in the invoice form with:
   - Your company information (From section)
   - Client information (Bill To section)
   - Invoice items (description, quantity, unit price)
   - Additional details (due date, tax rate, discount, etc.)
4. Click "Create Invoice"
5. Download the PDF or view all invoices

### Create an Invoice with cURL (API)

```bash
curl -X POST http://localhost:3000/api/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "from": {
      "name": "Acme Corp",
      "email": "billing@acme.com",
      "address": "123 Business St, New York, NY 10001",
      "phone": "+1 212 555 0100"
    },
    "to": {
      "name": "Client Corp",
      "email": "accounts@client.com",
      "address": "456 Client Ave, Los Angeles, CA 90001"
    },
    "items": [
      {
        "description": "Consulting Services",
        "quantity": 10,
        "unitPrice": 150.00
      }
    ],
    "taxRate": 8.5,
    "notes": "Thank you for your business!"
  }'
```

### Download Invoice PDF

```bash
curl -X GET http://localhost:3000/api/invoices/{invoice-id}/pdf \
  --output invoice.pdf
```

## Future Enhancements

- Database integration (PostgreSQL, MongoDB)
- User authentication and authorization
- Email invoice delivery
- Payment tracking and reminders
- Multiple currency support
- Invoice templates customization
- Recurring invoices
- Analytics and reporting

## License

ISC
