# 🍽️ Chef Mostafa - Complete Migration Guide

## 📋 Migration Overview
Migrating from old accounts to new ones:
- **GitHub**: `oubod/twillo` → `cheffmostafaa-debug/chefmostafa`
- **Supabase**: Old project → `trucpvoesauuvuknmnen`
- **Twilio**: Old account → New account with new credentials

---

## 🗄️ Step 1: Setup Supabase Database

### 1.1 Run SQL Migration
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your new project: `trucpvoesauuvuknmnen`
3. Go to **SQL Editor**
4. Copy and paste the contents of `migration-new-supabase.sql`
5. Click **Run**

### 1.2 Get Service Role Key
1. In Supabase Dashboard → **Settings** → **API**
2. Copy the `service_role` key (not the anon key)
3. Save it for Edge Function deployment

---

## 🔧 Step 2: Update Local Environment

### 2.1 Replace Environment Variables
```bash
# Copy the new environment file
cp .env.new .env
```

### 2.2 Update .env with your Twilio WhatsApp number
Edit `.env` and replace `+14155238886` with your actual Twilio WhatsApp number.

---

## 🚀 Step 3: Deploy Edge Functions

### 3.1 Install Supabase CLI (if not installed)
```bash
npm install -g supabase
```

### 3.2 Deploy Functions
```bash
# Make deploy script executable (on Mac/Linux)
chmod +x deploy-new-supabase.sh

# Run deployment
./deploy-new-supabase.sh
```

Or manually:
```bash
supabase link --project-ref trucpvoesauuvuknmnen
supabase functions deploy send-whatsapp --no-verify-jwt
supabase secrets set TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
supabase secrets set TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
supabase secrets set TWILIO_WHATSAPP_NUMBER=+14155238886
```

---

## 📱 Step 4: Setup Twilio WhatsApp Templates

### 4.1 Create WhatsApp Template
1. Go to [Twilio Console](https://console.twilio.com)
2. Navigate to **Messaging** → **Senders** → **WhatsApp Senders**
3. Click **Create Message Template**
4. Template details:
   - **Name**: `order_confirmation_ar`
   - **Language**: Arabic
   - **Category**: Transactional
   - **Content**: `طلب {{1}} {{2}} الإجمالي: {{3}}`

### 4.2 Wait for Approval
- Template approval takes 1-24 hours
- You'll receive an email when approved

### 4.3 Update Template SID
Once approved, update `services/orderService.ts` line 117:
```typescript
contentSid: 'YOUR_APPROVED_TEMPLATE_SID_HERE',
```

---

## 🌐 Step 5: Deploy Frontend

### 5.1 Update Netlify/Vercel Environment
Update your hosting platform environment variables with new Supabase credentials.

### 5.2 Build and Deploy
```bash
npm run build
# Deploy to your hosting platform
```

---

## 🧪 Step 6: Test Everything

### 6.1 Test Database Connection
- Check if menu items load
- Try placing a test order

### 6.2 Test WhatsApp Messages
- Place an order to test WhatsApp notification
- Check message logs in Supabase `whatsapp_messages` table

---

## 🔄 Step 7: Push to New GitHub

### 7.1 Push All Changes
```bash
git add .
git commit -m "Complete migration to new accounts"
git push origin main
```

### 7.2 Set Main as Default Branch
1. Go to your new GitHub repository
2. Settings → Branches
3. Set `main` as default branch

---

## ✅ Migration Checklist

- [ ] Supabase database created with all tables
- [ ] Environment variables updated
- [ ] Edge Functions deployed
- [ ] Twilio WhatsApp template created
- [ ] Frontend deployed with new credentials
- [ ] WhatsApp messages tested
- [ ] All code pushed to new GitHub repo
- [ ] Main branch set as default

---

## 🚨 Important Notes

1. **WhatsApp Templates**: Must be approved before messages work
2. **Phone Numbers**: Ensure your Twilio WhatsApp number is verified
3. **Environment Variables**: Never commit `.env` files to Git
4. **Testing**: Test thoroughly before going live
5. **Backup**: Keep old account access until migration is complete

---

## 🆘 Troubleshooting

### WhatsApp Error 63016
- Create and approve WhatsApp template in Twilio
- Use `contentSid` instead of freeform messages

### Edge Function Not Working
- Check Supabase secrets are set correctly
- Verify function deployment logs

### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies

---

## 📞 Support

If you encounter issues:
1. Check Supabase logs
2. Review Twilio error messages
3. Verify all environment variables
4. Test each component separately

🎉 **Migration Complete! Your restaurant is now running on the new infrastructure.**
