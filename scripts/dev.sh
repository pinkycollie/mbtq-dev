#!/bin/bash

# mbtq Quantum Dev - Unified Development Script
# Run all services in development mode

set -e

echo "🌈 Starting mbtq Quantum Dev Environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Start server in background
echo "🚀 Starting Socket.IO server..."
cd server
npm install
npm start &
SERVER_PID=$!
cd ..

# Wait for server to be ready
sleep 3

# Start web app with turbo
echo "✨ Starting web application..."
pnpm dev

# Cleanup on exit
trap "kill $SERVER_PID" EXIT
