#!/bin/bash
# API Testing Script for MBTQ Content Fulfillment API
# This script demonstrates the complete workflow of the API

set -e

BASE_URL="http://localhost:4000"
API_KEY="test-api-key-replace-with-actual"  # Replace with actual API key from seed

echo "🧪 MBTQ Content Fulfillment API Test Suite"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo -e "${BLUE}Test 1: Health Check${NC}"
curl -s -X GET "$BASE_URL/" | jq '.'
echo ""

# Test 2: Create a new request
echo -e "${BLUE}Test 2: Create New Video Request${NC}"
REQUEST_RESPONSE=$(curl -s -X POST "$BASE_URL/api/requests" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d '{
    "title": "ASL Video for Product Demo",
    "description": "Need professional ASL interpretation for product demonstration video",
    "requirements": {
      "skills": ["ASL", "video-editing"],
      "duration": "5 minutes",
      "quality": "professional"
    },
    "serviceType": "sign-language",
    "budget": 600,
    "deadline": "2026-01-31T23:59:59Z"
  }')
echo "$REQUEST_RESPONSE" | jq '.'
REQUEST_ID=$(echo "$REQUEST_RESPONSE" | jq -r '.data.id')
echo -e "${GREEN}✅ Created request with ID: $REQUEST_ID${NC}"
echo ""

# Test 3: List all requests
echo -e "${BLUE}Test 3: List All Requests${NC}"
curl -s -X GET "$BASE_URL/api/requests?page=1&limit=5" \
  -H "X-API-Key: $API_KEY" | jq '.'
echo ""

# Test 4: Get specific request
echo -e "${BLUE}Test 4: Get Request Details${NC}"
curl -s -X GET "$BASE_URL/api/requests/$REQUEST_ID" \
  -H "X-API-Key: $API_KEY" | jq '.'
echo ""

# Test 5: Update request status
echo -e "${BLUE}Test 5: Update Request Status${NC}"
curl -s -X PATCH "$BASE_URL/api/requests/$REQUEST_ID/status" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d '{
    "status": "OPEN_FOR_BIDS",
    "notes": "Opening request for creator bids"
  }' | jq '.'
echo ""

# Test 6: Get available requests (creator view)
echo -e "${BLUE}Test 6: Get Available Requests (Creator View)${NC}"
AVAILABLE_REQUESTS=$(curl -s -X GET "$BASE_URL/api/creators/requests/available?serviceType=sign-language&page=1&limit=5")
echo "$AVAILABLE_REQUESTS" | jq '.'
AVAILABLE_REQUEST_ID=$(echo "$AVAILABLE_REQUESTS" | jq -r '.data[0].id')
echo ""

# Test 7: Creator submits a bid
echo -e "${BLUE}Test 7: Creator Submits Bid${NC}"
# Note: In real scenario, you'd get the creator ID from authentication
BID_RESPONSE=$(curl -s -X POST "$BASE_URL/api/creators/bids" \
  -H "Content-Type: application/json" \
  -d '{
    "requestId": "'"$REQUEST_ID"'",
    "creatorId": "placeholder-creator-id",
    "amount": 550,
    "proposal": "I am an experienced ASL interpreter with 10+ years of experience...",
    "estimatedDays": 7
  }')
echo "$BID_RESPONSE" | jq '.'
# Note: This will likely fail without a valid creator ID from the database
echo ""

# Test 8: Register webhook
echo -e "${BLUE}Test 8: Register Webhook URL${NC}"
curl -s -X POST "$BASE_URL/api/webhooks/register" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d '{
    "webhookUrl": "https://videos.mbtq.dev/webhooks/test"
  }' | jq '.'
echo ""

# Test 9: Test webhook delivery
echo -e "${BLUE}Test 9: Test Webhook Delivery${NC}"
curl -s -X POST "$BASE_URL/api/webhooks/test" \
  -H "X-API-Key: $API_KEY" | jq '.'
echo ""

# Test 10: Get webhook events
echo -e "${BLUE}Test 10: Get Webhook Events${NC}"
curl -s -X GET "$BASE_URL/api/webhooks/events?page=1&limit=5" \
  -H "X-API-Key: $API_KEY" | jq '.'
echo ""

# Test 11: Find matching creators
echo -e "${BLUE}Test 11: Find Matching Creators for Request${NC}"
if [ ! -z "$AVAILABLE_REQUEST_ID" ]; then
  curl -s -X GET "$BASE_URL/api/creators/match/$AVAILABLE_REQUEST_ID" | jq '.'
else
  echo -e "${YELLOW}Skipped: No available request ID${NC}"
fi
echo ""

echo -e "${GREEN}🎉 Test suite completed!${NC}"
echo ""
echo "Note: Some tests may fail if:"
echo "  - The server is not running (npm run dev)"
echo "  - The database is not seeded (npm run prisma:seed)"
echo "  - The API_KEY variable at the top of this script is not set correctly"
echo ""
echo "To set the correct API key:"
echo "  1. Run: npm run prisma:seed"
echo "  2. Copy one of the API keys from the output"
echo "  3. Edit this script and replace the API_KEY value"
