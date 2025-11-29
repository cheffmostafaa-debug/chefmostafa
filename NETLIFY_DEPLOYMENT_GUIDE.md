# Netlify Deployment Guide

## 📋 Overview
This guide covers deploying the Chef Mustafa Restaurant App to Netlify.

## 🚀 Quick Deployment

### 1. Build the App
```bash
npm run build
```
This creates a `dist/` folder with all production assets.

### 2. Upload to Netlify
- **Option A:** Drag and drop the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)
- **Option B:** Connect your GitHub repository to Netlify for automatic deployments

## ⚙️ Environment Variables

Before deploying, set these environment variables in Netlify Dashboard:

**Site Settings → Environment Variables**

### Required Variables:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RESTAURANT_OWNER_PHONE=your_restaurant_owner_phone
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Optional Variables (for WhatsApp notifications):
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
```

## 📁 Project Structure
```
├── dist/                 # Production build (upload this folder)
│   ├── index.html        # Main HTML file
│   ├── assets/           # JavaScript and CSS assets
│   ├── images/           # Static images
│   ├── logo.png          # Restaurant logo
│   └── manifest.json     # PWA manifest
├── public/               # Static assets
├── src/                  # Source code
└── netlify.toml         # Netlify configuration
```

## 🔧 Configuration Files

### `netlify.toml`
- Handles SPA routing
- Sets Node.js version to 18
- Configures build settings

### Build Configuration
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18

## 📱 Features
- **PWA Support:** Works offline and can be installed as mobile app
- **Responsive Design:** Optimized for all devices
- **Multi-language:** Arabic and French support
- **Real-time Orders:** WhatsApp notifications for restaurant owner
- **AI Waiter:** Gemini AI for customer assistance

## 🛠️ Post-Deployment Checklist

1. **Environment Variables:** Ensure all required variables are set
2. **Domain:** Configure custom domain if needed
3. **HTTPS:** Netlify provides automatic SSL
4. **Test Features:**
   - Menu browsing
   - Cart functionality
   - Order submission
   - AI waiter chat
   - WhatsApp notifications

## 🔍 Troubleshooting

### Common Issues:
1. **Environment Variables Not Working**
   - Ensure variables are prefixed with `VITE_` for client-side access
   - Check Netlify environment variables settings

2. **Build Failures**
   - Verify Node.js version (18)
   - Check package.json scripts

3. **API Errors**
   - Validate Supabase configuration
   - Check Gemini API key validity

## 📞 Support
For deployment issues, check:
1. Netlify build logs
2. Browser console errors
3. Environment variable configuration

---

**Ready to deploy!** 🎉 The app is optimized for Netlify and should deploy successfully with the steps above.
