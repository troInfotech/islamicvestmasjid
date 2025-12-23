# 📱 iPhone Display Fix - Instructions

## Problem
The widget shows purple backdrop and doesn't fill the container properly on iPhone.

## Solution Applied
I've updated the CSS with:
1. ✅ Precise height calculations matching scaled iframe dimensions
2. ✅ White background forced with `!important`
3. ✅ Optimized scaling factors for different iPhone sizes
4. ✅ Better positioning to eliminate gaps

## 🔄 MUST DO: Clear Browser Cache on iPhone

The issue you're seeing might be **browser caching**. Follow these steps:

### Method 1: Hard Refresh in Safari (Quick)
1. Open the page in Safari
2. Tap the **refresh button** and **hold it** for 2 seconds
3. Select "**Request Desktop Website**" then switch back to mobile
4. Or pull down on the page to refresh

### Method 2: Clear Safari Cache (Recommended)
1. Close Safari completely (swipe up from bottom, swipe Safari away)
2. Go to **Settings** → **Safari**
3. Scroll down and tap **"Clear History and Website Data"**
4. Confirm by tapping **"Clear History and Data"**
5. Reopen Safari and visit your site

### Method 3: Private Browsing (Quick Test)
1. Open Safari
2. Tap the tabs button (bottom right)
3. Tap **"Private"** (bottom left)
4. Open a new private tab
5. Visit your site - this bypasses cache

## 🧪 Test Page Created

I've created a dedicated test page: **`widget-test-mobile.html`**

### To Test:
1. Upload `widget-test-mobile.html` to your server
2. Visit it on your iPhone: `https://yoursite.com/widget-test-mobile.html`
3. This page has the EXACT same styling with no cache

**What you should see:**
- ✅ Widget fills white container completely
- ✅ NO purple showing around widget
- ✅ All prayer times clearly visible
- ✅ Clean rounded borders

**If test page works but main page doesn't:** It's definitely a caching issue!

## 📊 What Changed in CSS

### For iPhone Screens (≤390px):
```css
Container Height: 306px (exactly matches scaled iframe)
Scale Factor: 0.51
Calculation: 600px × 0.51 = 306px (perfect fit!)
```

### For Larger Phones (≤480px):
```css
Container Height: 372px
Scale Factor: 0.62
Calculation: 600px × 0.62 = 372px (perfect fit!)
```

### Key Fix:
```css
background: #ffffff !important;  /* Forces white, overrides cache */
height: 306px !important;        /* Exact match for scaled content */
transform: translateX(-50%) scale(0.51) !important;
```

## 🎯 Expected Result

### Before (What you're seeing now):
```
┌─────────────────────────┐
│ Purple showing through  │ ← BAD
│  ┌─────────────────┐   │
│  │   Widget here   │   │
│  └─────────────────┘   │
│ Purple at bottom too    │ ← BAD
└─────────────────────────┘
```

### After (What you should see):
```
┌─────────────────────────┐
│   ┌─────────────────┐   │
│   │                 │   │ ← Clean white
│   │  Widget fills   │   │ ← No purple
│   │  perfectly!     │   │ ← All visible
│   │                 │   │
│   └─────────────────┘   │
└─────────────────────────┘
```

## 🔍 Debugging Steps

### 1. Check Screen Size
The test page shows your screen dimensions. Most iPhones:
- iPhone 14/13/12: 390px width
- iPhone 11/XR: 414px width
- iPhone SE: 375px width

### 2. Verify CSS Loaded
In Safari on iPhone:
1. Tap the **AA** button in address bar
2. Select **"Show Reader"** - if it works, page loaded
3. Exit reader and view normal page

### 3. Check Developer Mode (Advanced)
If you have a Mac:
1. Connect iPhone via USB
2. Enable Web Inspector on iPhone: Settings → Safari → Advanced → Web Inspector
3. Open Safari on Mac → Develop → [Your iPhone] → [Your Page]
4. Check Console for errors

## 📱 Platform-Specific Cache Clearing

### iPhone Safari:
Settings → Safari → Clear History and Website Data

### iPhone Chrome:
Chrome → ... (three dots) → Settings → Privacy → Clear Browsing Data → Cached Images and Files

### iPhone Firefox:
Settings → Data Management → Clear Private Data → Cache

## ✅ Verification Checklist

After clearing cache, verify:
- [ ] No purple/gradient showing around widget
- [ ] Widget has clean white background
- [ ] All 5 prayer times visible (Fajr, Shuruq, Zuhr, Asr, Maghrib)
- [ ] Widget time matches current time
- [ ] No cutoff at top or bottom
- [ ] Clean rounded corners
- [ ] Proper shadows

## 🚨 Still Not Working?

If you've cleared the cache and it still doesn't work:

### 1. Test with widget-test-mobile.html
If test page works → caching issue on main page
If test page broken too → different issue

### 2. Check Widget Source
The widget URL should be:
```
https://time.my-masjid.com/widget/eb313f9e-dae0-4f1e-ab67-c7bf44456523
```

### 3. Send me:
- Screenshot of widget-test-mobile.html on your iPhone
- Your iPhone model
- Safari version (Settings → Safari → Advanced → About)
- Screen width from test page

## 🎯 Summary

**Changes made:**
- ✅ Precise height calculations (306px for iPhone)
- ✅ White background forced
- ✅ Optimized scaling (0.51 for iPhone)
- ✅ All CSS rules have `!important`

**What to do:**
1. ✅ Clear Safari cache on iPhone
2. ✅ Test with widget-test-mobile.html
3. ✅ Hard refresh main page
4. ✅ Verify no purple showing

**Expected result:**
Clean white container with widget filling it perfectly, no purple backdrop visible!

---

**Need help?** Send screenshot of widget-test-mobile.html showing screen size and widget display.

