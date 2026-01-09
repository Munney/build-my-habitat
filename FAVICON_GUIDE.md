# Favicon Setup Guide

## Current Setup

Your favicon is configured in `app/layout.js` with proper metadata. Next.js automatically serves `app/favicon.ico` for the browser tab icon.

## How to Change Your Favicon

### Option 1: Replace the Existing File (Easiest)

1. **Create your favicon image:**
   - Size: 32x32 pixels (minimum) or 512x512 (recommended)
   - Format: `.ico`, `.png`, or `.svg`
   - Design: Simple, recognizable icon that represents HabitatBuilder
   - Colors: Should work on both light and dark backgrounds

2. **Replace the file:**
   - Replace `app/favicon.ico` with your new favicon
   - Keep the same filename: `favicon.ico`

3. **Optional: Add multiple sizes for better quality:**
   - Create `public/icon-16x16.png` (16x16 pixels)
   - Create `public/icon-32x32.png` (32x32 pixels)
   - Create `public/apple-touch-icon.png` (180x180 pixels for iOS)

### Option 2: Use an Online Favicon Generator

1. Go to [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net)
2. Upload your logo/image or create one
3. Download the generated favicon files
4. Replace `app/favicon.ico` with the generated `favicon.ico`
5. (Optional) Add the other sizes to the `public` folder

### Option 3: Design Suggestions

**Good favicon ideas for HabitatBuilder:**
- 🦎 Gecko silhouette
- 🐠 Betta fish silhouette
- 🏠 Habitat/home icon
- 🔨 Hammer/tool icon (matches your builder theme)
- 🌿 Plant/leaf icon
- Combination of gecko + betta

**Design Tips:**
- Keep it simple (details get lost at small sizes)
- Use high contrast colors
- Test on both light and dark backgrounds
- Make it recognizable at 16x16 pixels

## File Locations

- **Main favicon:** `app/favicon.ico` (required)
- **Additional sizes:** `public/icon-16x16.png`, `public/icon-32x32.png` (optional)
- **Apple touch icon:** `public/apple-touch-icon.png` (optional, for iOS)

## After Replacing

1. **Clear browser cache** (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. **Hard refresh** the page (Ctrl+F5 or Cmd+Shift+R)
3. **Wait a few minutes** - browsers cache favicons aggressively
4. **Check in incognito mode** to see the new favicon immediately

## For Google Search Results

Google uses your favicon in search results. After updating:
- It may take a few days to update in Google search
- Google caches favicons, so be patient
- Make sure your favicon is accessible at `/favicon.ico`

## Current Configuration

Your `app/layout.js` is already configured with:
- ✅ Main favicon (`/favicon.ico`)
- ✅ Multiple sizes for better quality
- ✅ Apple touch icon for iOS devices
- ✅ Proper metadata for search engines

Just replace the image files and you're done!

