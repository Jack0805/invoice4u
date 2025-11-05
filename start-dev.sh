#!/bin/bash

# Invoice Generator - Development Startup Script

echo "=========================================="
echo "Invoice Generator - Starting Development"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Warning: Node.js version 20+ is recommended for Next.js 16"
    echo "Current version: $(node -v)"
    echo "You may encounter issues with the frontend."
    echo ""
fi

# Check if backend dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo ""
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo ""
fi

# Check if frontend .env.local exists
if [ ! -f "frontend/.env.local" ]; then
    echo "⚙️  Creating frontend .env.local file..."
    cp frontend/.env.example frontend/.env.local
    echo ""
fi

echo "=========================================="
echo "Starting Services..."
echo "=========================================="
echo ""

# Start backend
echo "🚀 Starting Backend API on http://localhost:3000"
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "🚀 Starting Frontend on http://localhost:3001"
cd frontend
npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "=========================================="
echo "✅ Services Started Successfully!"
echo "=========================================="
echo ""
echo "Backend API:  http://localhost:3000"
echo "Frontend UI:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
