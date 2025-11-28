# 📋 Manual Edge Function Deployment Guide

Since the CLI is having issues, let's deploy manually through the Supabase Dashboard.

## 🚀 Step 1: Deploy Edge Function Manually

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: `trucpvoesauuvuknmnen`
3. **Navigate to**: Edge Functions → Functions
4. **Click**: "Create Function"
5. **Function name**: `send-whatsapp`
6. **Paste the code** from: `supabase/functions/send-whatsapp/index.ts`

## 🔐 Step 2: Set Environment Secrets

1. **In the same project**, go to: Settings → Edge Functions
2. **Add these secrets**:
   ```
   TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
   TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
   TWILIO_WHATSAPP_NUMBER=+14155238886
   ```
   (Replace the WhatsApp number with your actual one)

## 📱 Step 3: Create WhatsApp Template in Twilio

1. **Go to Twilio Console**: https://console.twilio.com
2. **Navigate**: Messaging → Senders → WhatsApp Senders
3. **Click**: "Create Message Template"
4. **Template details**:
   - **Name**: `order_confirmation_ar`
   - **Language**: Arabic
   - **Category**: Transactional
   - **Content**: `طلب {{1}} {{2}} الإجمالي: {{3}}`

## ⏳ Step 4: Wait for Template Approval

- Template approval takes 1-24 hours
- You'll get an email when approved

## ✅ Step 5: Update Template SID

Once approved, edit `services/orderService.ts` line 117:
```typescript
contentSid: 'YOUR_APPROVED_TEMPLATE_SID_HERE',
```

## 🧪 Step 6: Test

1. **Deploy your frontend** with new environment variables
2. **Place a test order**
3. **Check if WhatsApp message sends**

---

## 📝 Alternative: Try CLI Again

If you want to try the CLI again:

1. **Verify you're in the right account**:
   ```bash
   supabase projects list
   ```

2. **Check if project exists**:
   ```bash
   supabase projects list --filter=trucpvoesauuvuknmnen
   ```

3. **Try linking again**:
   ```bash
   supabase link --project-ref trucpvoesauuvuknmnen
   ```

---

## 🎯 Quick Test

After manual deployment, test the Edge Function:
```bash
curl -X POST 'https://trucpvoesauuvuknmnen.supabase.co/functions/v1/send-whatsapp' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "message": {
      "to": "+222XXXXXXX",
      "type": "template",
      "contentSid": "YOUR_TEMPLATE_SID",
      "contentVariables": "{\"1\":\"123\",\"2\":\"Test Item\",\"3\":\"100 MRU\"}"
    }
  }'
```

Let me know when you've completed the manual deployment!
