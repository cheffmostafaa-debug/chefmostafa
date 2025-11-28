#!/bin/bash

# ========================================
# Chef Mostafa - Deploy to New Supabase
# ========================================

echo "🚀 Deploying Chef Mostafa to new Supabase account..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Link to new Supabase project
echo "📡 Linking to new Supabase project..."
supabase link --project-ref trucpvoesauuvuknmnen

# Deploy Edge Functions
echo "📦 Deploying Edge Functions..."
supabase functions deploy send-whatsapp --no-verify-jwt

# Set Edge Function secrets
echo "🔐 Setting Edge Function secrets..."
supabase secrets set TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
supabase secrets set TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
supabase secrets set TWILIO_WHATSAPP_NUMBER=+14155238886

echo "✅ Deployment complete!"
echo "📝 Next steps:"
echo "1. Update your .env file with new credentials"
echo "2. Test the WhatsApp integration"
echo "3. Create WhatsApp template in Twilio Console"
