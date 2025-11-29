# WhatsApp 24-Hour Window Validation Setup Guide

## Overview
This system ensures WhatsApp messages are only sent within the 24-hour customer service window, with automatic SMS fallback when outside the window.

## Database Migration

If you already have the `whatsapp_messages` table deployed, run this migration:

```sql
-- Add message_direction column to track inbound/outbound messages
ALTER TABLE whatsapp_messages 
ADD COLUMN message_direction VARCHAR(10) DEFAULT 'outbound' CHECK (message_direction IN ('inbound', 'outbound'));

-- Add index for faster queries on inbound messages
CREATE INDEX idx_whatsapp_messages_inbound ON whatsapp_messages(recipient_phone, created_at) WHERE message_direction = 'inbound';

-- Update existing messages to be marked as outbound
UPDATE whatsapp_messages SET message_direction = 'outbound' WHERE message_direction IS NULL;
```

## Environment Variables

Add these to your `.env` file (and `.env.example`):

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+222XXXXXXX
TWILIO_SMS_NUMBER=+222XXXXXXX  # Your Twilio SMS number (can be same as WhatsApp number)

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Twilio Webhook Configuration

### Critical Step: Configure Inbound Message Webhook

1. **Go to Twilio Console** → Messaging → Senders → Your WhatsApp Sender
2. **Set Webhook URL** to: `https://your-project.supabase.co/functions/v1/whatsapp-webhook`
3. **Configure these settings:**
   - **When a message comes in**: Webhook
   - **HTTP Method**: POST
   - **Request format**: Form-encoded

### Webhook URL Format
```
https://[YOUR-PROJECT-REF].supabase.co/functions/v1/whatsapp-webhook
```

Replace `[YOUR-PROJECT-REF]` with your actual Supabase project reference.

## Deploy Edge Functions

Deploy the updated edge functions:

```bash
# Deploy the main messaging function with validation
supabase functions deploy send-whatsapp --no-verify-jwt

# Deploy the webhook to receive inbound messages
supabase functions deploy whatsapp-webhook --no-verify-jwt
```

## Testing the System

### 1. Test Inbound Message Logging
```bash
# Send a test WhatsApp message to your business number
# Check that it appears in whatsapp_messages table with direction='inbound'
```

### 2. Test 24-Hour Window Validation
```bash
# Test within window (after customer messages):
curl -X POST 'https://your-project.supabase.co/functions/v1/send-whatsapp' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "message": {
      "to": "+222XXXXXXX",
      "message": "Test message within window",
      "type": "session"
    }
  }'
# Should send via WhatsApp successfully
```

### 3. Test SMS Fallback
```bash
# Wait 24+ hours after last customer message, then:
curl -X POST 'https://your-project.supabase.co/functions/v1/send-whatsapp' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "message": {
      "to": "+222XXXXXXX", 
      "message": "Test message outside window",
      "type": "session"
    }
  }'
# Should fallback to SMS and return: {"success": true, "fallback": "sms"}
```

### 4. Test Template Messages (Should Work Anytime)
```bash
curl -X POST 'https://your-project.supabase.co/functions/v1/send-whatsapp' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "message": {
      "to": "+222XXXXXXX",
      "message": "Template message",
      "type": "template",
      "templateName": "your_approved_template"
    }
  }'
# Should work regardless of 24-hour window
```

## Monitoring and Debugging

### Check Message Logs
```sql
-- View recent messages with direction
SELECT 
  message_direction,
  message_type,
  status,
  message_content,
  created_at
FROM whatsapp_messages 
ORDER BY created_at DESC 
LIMIT 10;
```

### Check 24-Hour Window Status
```sql
-- Find last inbound message for a customer
SELECT 
  recipient_phone,
  created_at as last_inbound_message,
  NOW() - created_at as hours_since_last_message
FROM whatsapp_messages 
WHERE message_direction = 'inbound' 
  AND recipient_phone = '+222XXXXXXX'
ORDER BY created_at DESC 
LIMIT 1;
```

## Order Flow Integration

The system automatically integrates with your existing order flow:

1. **Customer places order** → Triggers WhatsApp notification
2. **Within 24-hour window** → Sends via WhatsApp
3. **Outside window** → Falls back to SMS automatically
4. **Template messages** → Work anytime (for approved templates)

## Troubleshooting

### Common Issues

1. **Webhook not receiving messages**
   - Verify webhook URL in Twilio console
   - Check function logs in Supabase dashboard
   - Ensure `--no-verify-jwt` flag is used

2. **Always falling back to SMS**
   - Check if inbound messages are being logged
   - Verify `message_direction = 'inbound'` in database
   - Check webhook is configured correctly

3. **SMS not sending**
   - Verify `TWILIO_SMS_NUMBER` environment variable
   - Check Twilio SMS credits
   - Ensure phone number format is correct

### Error Messages

- **Error 63016**: Outside 24-hour window (expected behavior)
- **Webhook timeout**: Check function performance and logs
- **Authentication failed**: Verify environment variables

## Security Considerations

- Webhook endpoint is open (no JWT verification required for Twilio)
- All outbound messages require valid Supabase anon key
- Phone numbers are normalized and validated
- Message content is logged for auditing

## Rate Limiting (Optional)

To prevent abuse, consider adding rate limiting in your webhook:

```typescript
// Add to whatsapp-webhook/index.ts
const RATE_LIMIT = 10; // messages per minute
const rateLimitMap = new Map();

function checkRateLimit(phone: string): boolean {
  const now = Date.now();
  const windowStart = now - 60000; // 1 minute ago
  const requests = rateLimitMap.get(phone) || [];
  
  // Filter old requests
  const recentRequests = requests.filter((time: number) => time > windowStart);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(phone, recentRequests);
  return true;
}
```

## Compliance Notes

- This system respects WhatsApp's 24-hour messaging policy
- All messages are logged for compliance auditing
- Consider adding opt-in/opt-out functionality for GDPR/TCPA compliance
- Template messages must be pre-approved by WhatsApp
