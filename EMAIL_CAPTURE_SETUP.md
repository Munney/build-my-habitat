# Email Capture System Setup Guide

## ✅ What's Been Implemented

1. **EmailCapturePopup** - Beautiful exit-intent popup
2. **EmailCaptureInline** - Inline form on summary pages
3. **ExitIntentTracker** - Detects when users are leaving
4. **API Route** - `/api/email-capture` endpoint
5. **Integration** - Added to homepage and summary pages

## 📧 Email Service Integration

The system is ready to integrate with your email service. Currently, it just logs emails. To connect to a real service:

### Option 1: Mailchimp (Recommended - Free up to 2,000 contacts)

1. **Sign up:** https://mailchimp.com (free tier available)
2. **Get API Key:**
   - Go to Account → Extras → API keys
   - Create a new API key
3. **Get List ID:**
   - Create a list in Mailchimp
   - Go to Settings → List name and defaults
   - Copy the "List ID"
4. **Add to `.env`:**
   ```
   MAILCHIMP_API_KEY=your-api-key-here
   MAILCHIMP_LIST_ID=your-list-id-here
   ```
5. **Uncomment Mailchimp code** in `app/api/email-capture/route.js`

### Option 2: ConvertKit (Free up to 1,000 subscribers)

1. **Sign up:** https://convertkit.com
2. **Get API Key:**
   - Settings → Advanced → API Secret
3. **Add to `.env`:**
   ```
   CONVERTKIT_API_KEY=your-api-key-here
   CONVERTKIT_FORM_ID=your-form-id-here
   ```
4. **Update API route** to use ConvertKit API

### Option 3: SendGrid (Free up to 100 emails/day)

1. **Sign up:** https://sendgrid.com
2. **Get API Key:**
   - Settings → API Keys → Create API Key
3. **Add to `.env`:**
   ```
   SENDGRID_API_KEY=your-api-key-here
   SENDGRID_FROM_EMAIL=noreply@buildmyhabitat.com
   ```

## 🎁 Lead Magnet Setup

### Create Your Lead Magnet PDF

1. **"Complete Setup Checklist" PDF** - Include:
   - Setup step-by-step checklist
   - Product recommendations
   - Care reminders
   - Common mistakes to avoid

2. **"5 Common Mistakes" PDF** - Include:
   - Top 5 mistakes for each species
   - Why they're dangerous
   - How to avoid them

3. **Store PDFs:**
   - Upload to `/public/lead-magnets/`
   - Or use a service like Gumroad/SendOwl

### Auto-Send PDF via Email

Once you have an email service connected, you can:

1. **Set up automated email** in Mailchimp/ConvertKit
2. **Trigger on signup** - Send PDF automatically
3. **Or use API** to send email with PDF attachment

## 📊 Analytics Tracking

The system automatically tracks:
- `email_captured` event
- Source (popup/inline)
- Lead magnet name

View in Google Analytics:
- Events → email_captured
- See conversion rates by source

## 🎨 Customization

### Change Popup Text

Edit `app/components/EmailCapture.js`:
- Line 20: Popup title
- Line 22: Subtitle text
- Line 30: Button text

### Change Inline Form

Edit `EmailCaptureInline` component:
- Line 100: Form title
- Line 101: Description

### Disable Exit Intent

Remove `<ExitIntentTracker />` from pages if you don't want it.

## 📈 Expected Results

**Conservative (100 visitors/day):**
- 5-10% email capture rate
- 5-10 emails/day
- 150-300 emails/month

**Optimistic (500 visitors/day):**
- 10-15% email capture rate
- 50-75 emails/day
- 1,500-2,250 emails/month

## 🚀 Next Steps

1. **Choose email service** (Mailchimp recommended)
2. **Add API keys** to `.env`
3. **Create lead magnet PDF**
4. **Set up auto-responder** email
5. **Test the system** end-to-end
6. **Monitor analytics** for conversion rates

## 💡 Pro Tips

1. **A/B Test:** Try different popup copy
2. **Timing:** Exit intent works best (already implemented)
3. **Value:** Make lead magnet valuable (not just a list)
4. **Follow-up:** Set up email sequence after signup
5. **Segmentation:** Tag emails by species (betta vs gecko)

## 🔧 Troubleshooting

**Popup not showing:**
- Check browser console for errors
- Verify `ExitIntentTracker` is imported
- Check sessionStorage isn't blocking

**Emails not being captured:**
- Check API route is working (`/api/email-capture`)
- Verify email service API keys
- Check server logs for errors

**Analytics not tracking:**
- Verify Google Tag Manager is loaded
- Check `window.dataLayer` exists
- Test in browser console

