# Troubleshooting: 3DEXPERIENCE Widget Issues

## Problems Identified from Your Console Log

### 1. ❌ Ngrok Free Plan Issues

**Problem:**
```
Uncaught Error: Cannot render error. Refresh the page to try again.
    <anonymous> https://cdn.ngrok.com/static/compiled/js/allerrors.js:1
```

**Cause:** 
Ngrok's free plan injects JavaScript into your pages for the warning screen. This breaks when loaded in an iframe within 3DEXPERIENCE Platform.

**Solutions:**

#### A) Upgrade to Ngrok Paid Plan (Recommended - $8/month)
```bash
# Advantages:
# - No injected scripts
# - Custom domains
# - No warning page
# - More reliable
```

#### B) Use Alternative Tunneling (Free)
```bash
# Option 1: Cloudflare Tunnel (Free, no injection)
cloudflared tunnel --url https://localhost:8443

# Option 2: LocalTunnel (Free, but less stable)
npx localtunnel --port 8443 --subdomain my3dxwidget

# Option 3: Serveo (Free SSH tunnel)
ssh -R 80:localhost:8443 serveo.net
```

#### C) Deploy to Free Hosting
- **Vercel** (free tier, supports Node.js)
- **Netlify** (free tier, static + functions)
- **Railway** (free tier with 500 hours/month)
- **Render** (free tier)

---

### 2. ❌ CORS Issues

**Problem:**
```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource
```

**Cause:**
3DEXPERIENCE Platform resources (like ENOXIDCard.js) are blocked by CORS when loaded from your widget.

**Solution:**
Your widget should NOT try to load 3DEXPERIENCE Platform resources directly. The platform handles this. Just focus on your widget content.

**What to avoid:**
```html
<!-- DON'T DO THIS in your widget -->
<script src="https://r1132100014757-eu1-space.3dexperience.3ds.com/..."></script>
```

**What to do:**
```html
<!-- Use the widget API provided by the platform -->
<script>
  // Access platform features via widget API
  if (typeof widget !== 'undefined') {
    // Use widget.getValue(), widget.setValue(), etc.
  }
</script>
```

---

### 3. ⚠️ X-Frame-Options / CSP Issues

**Problem:**
Your widget may be blocked from loading in an iframe due to security headers.

**Solution:**
I've updated the server to include proper headers:

```javascript
'X-Frame-Options': 'ALLOWALL',
'Content-Security-Policy': "frame-ancestors *"
```

---

## Step-by-Step Fix

### Step 1: Use the Improved Server

Replace your current `server.js` with the new `server-improved.js`:

```bash
cd /home/claude/3dx-widget-dev
node server-improved.js
```

### Step 2: Choose Better Tunneling

#### Option A: Cloudflare Tunnel (Best Free Option)

1. **Install Cloudflare Tunnel:**
```bash
# macOS
brew install cloudflare/cloudflare/cloudflared

# Linux
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Windows
# Download from: https://github.com/cloudflare/cloudflared/releases
```

2. **Run tunnel:**
```bash
# Start your server
node server-improved.js

# In another terminal, create tunnel
cloudflared tunnel --url https://localhost:8443
```

3. **Get your URL:**
Look for output like:
```
Your quick Tunnel has been created! Visit it at:
https://abc-123-xyz.trycloudflare.com
```

4. **Use this URL in 3DEXPERIENCE** - NO injected scripts!

#### Option B: Deploy to Free Hosting

**Using Render (Free, Permanent URL):**

1. Create account at https://render.com
2. Create new "Web Service"
3. Connect your GitHub repo (or upload code)
4. Set build command: `npm install`
5. Set start command: `node server-improved.js`
6. Deploy

You'll get a permanent HTTPS URL like: `https://my-widget.onrender.com`

---

### Step 3: Update Widget Configuration in 3DEXPERIENCE

1. Go to 3DEXPERIENCE Platform
2. Navigate to widget configuration
3. Update the URL to your new tunnel/hosting URL
4. Make sure the URL points to `/widget.html` or your main file:
   ```
   https://your-tunnel-url.com/widget.html
   ```
5. Save and refresh

---

## Testing Your Widget

### Test 1: Direct Browser Access

1. Open your widget URL directly in browser
2. You should see the widget interface
3. Check browser console (F12) for errors
4. Status should show "Standalone" (since not in 3DX yet)

### Test 2: In 3DEXPERIENCE Platform

1. Load widget in 3DEXPERIENCE
2. Open browser console (F12)
3. Look for log messages from your widget
4. Status should show "Connected"
5. User information should appear

---

## Common Errors and Fixes

### Error: "Cannot render error" (ngrok injection)
**Fix:** Use Cloudflare Tunnel or paid ngrok plan

### Error: "CORS blocked"
**Fix:** Don't load external 3DX resources in your widget

### Error: "Blocked by X-Frame-Options"
**Fix:** Use the improved server with correct headers

### Error: "Widget API not available"
**Fix:** Widget is loading correctly but outside 3DX context (expected in direct browser)

### Error: "Script error for DS/..."
**Fix:** Ignore these - they're from 3DX platform, not your widget

---

## Recommended Setup for Production

### For Development (Free):
1. Use **Cloudflare Tunnel** for testing
2. Quick setup, no cost
3. URL changes each time (use for short-term testing)

### For Long-term Development (Free):
1. Deploy to **Render** or **Railway**
2. Permanent URL
3. Automatic SSL
4. Git-based deployment

### For Production (Recommended):
1. Deploy to **DS corporate infrastructure**
2. Or use **AWS/Azure** with proper domain
3. Valid SSL certificates
4. Proper security and monitoring

---

## Updated Widget Checklist

✅ Server includes proper CORS headers
✅ Server allows iframe embedding
✅ Widget doesn't load external 3DX resources
✅ Widget checks for `widget` API availability
✅ Widget handles both standalone and embedded modes
✅ No injected scripts from tunneling service
✅ HTTPS enabled
✅ Proper error handling and logging

---

## Next Steps

1. **Stop using ngrok free plan** - it injects scripts
2. **Use Cloudflare Tunnel or deploy to hosting**
3. **Test with the new widget.html** - it has better error handling
4. **Check DS internal resources** - you may have access to better infrastructure

---

## For Dassault Systemes Employees

As a DS employee working with DELMIA/3DEXPERIENCE:

1. **Check with IT for dev servers** - they likely have infrastructure for this
2. **Ask about 3DX dev/sandbox environments** - may have easier widget deployment
3. **Review internal documentation** - may have specific widget deployment guides
4. **Contact 3DEXPERIENCE Platform team** - they can provide best practices

---

## Quick Command Reference

```bash
# Start improved server
node server-improved.js

# Cloudflare Tunnel (recommended)
cloudflared tunnel --url https://localhost:8443

# Ngrok (if you have paid plan)
ngrok http https://localhost:8443 --region eu

# LocalTunnel
npx localtunnel --port 8443

# Check what's running on port 8443
lsof -i :8443

# Kill process on port 8443
kill -9 $(lsof -t -i:8443)
```

---

## Contact for Help

If issues persist:
1. Share the browser console output from inside 3DEXPERIENCE
2. Share your widget configuration in 3DX
3. Confirm which tunneling/hosting method you're using
4. Check with DS internal support if available
