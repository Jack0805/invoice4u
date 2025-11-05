#!/bin/bash

# Invoice Generator API Test Script

API_URL="http://localhost:3000"

echo "==================================="
echo "Invoice Generator API Test Script"
echo "==================================="
echo ""

# Check if server is running
echo "1. Checking API health..."
response=$(curl -s $API_URL)
if [ $? -eq 0 ]; then
  echo "✓ API is running"
  echo "$response" | head -5
else
  echo "✗ API is not running. Please start with: npm start"
  exit 1
fi

echo ""
echo "2. Creating a test invoice..."
invoice_response=$(curl -s -X POST $API_URL/api/invoices \
  -H "Content-Type: application/json" \
  -d @example-request.json)

echo "$invoice_response" | head -10
invoice_id=$(echo "$invoice_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$invoice_id" ]; then
  echo "✗ Failed to create invoice"
  exit 1
fi

echo "✓ Invoice created with ID: $invoice_id"

echo ""
echo "3. Fetching invoice details..."
curl -s $API_URL/api/invoices/$invoice_id | head -10
echo ""

echo ""
echo "4. Downloading invoice PDF..."
curl -s -o "invoice-$invoice_id.pdf" $API_URL/api/invoices/$invoice_id/pdf
if [ -f "invoice-$invoice_id.pdf" ]; then
  echo "✓ PDF downloaded: invoice-$invoice_id.pdf"
  ls -lh "invoice-$invoice_id.pdf"
else
  echo "✗ Failed to download PDF"
fi

echo ""
echo "5. Getting all invoices..."
curl -s $API_URL/api/invoices | head -10
echo ""

echo ""
echo "==================================="
echo "Test completed!"
echo "==================================="
