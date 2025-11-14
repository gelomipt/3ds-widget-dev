# Deploying to Render.com - Step by Step Guide

## 📋 Prerequisites

1. **GitHub Account** - You'll need to push your code to GitHub
2. **Render Account** - Sign up at https://render.com (free tier available)

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Code for GitHub

1. **Initialize Git repository** (if not already done):
```bash
cd /path/to/3dx-widget-dev
git init
```

2. **Add all files**:
```bash
git add .
```

3. **Commit**:
```bash
git commit -m "Initial commit: 3DEXPERIENCE widget for Render deployment"
```

### Step 2: Push to GitHub

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `3dx-widget` (or any name you prefer)
   - Set to Public or Private (both work with Render)
   - Don't initialize with README (you already have files)
   - Click "Create repository"

2. **Push your code**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/3dx-widget.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Render

1. **Log in to Render**:
   - Go to https://dashboard.render.com
   - Sign in or create account (can use GitHub to sign in)

2. **Create New Web Service**:
   - Click "New +" button
   - Select "Web Service"

3. **Connect Repository**:
   - Click "Connect account" to authorize GitHub
   - Find your `3dx-widget` repository
   - Click "Connect"

4. **Configure Service**:

   **Basic Settings:**
   - **Name**: `3dx-widget` (or your preferred name)
   - **Region**: Choose closest to your 3DEXPERIENCE instance
     - `Frankfurt (EU Central)` if 3DX is in Europe
     - `Singapore` if in Asia
     - `Oregon (US West)` if in US
   - **Branch**: `main`
   - **Root Directory**: Leave empty (unless widget is in subdirectory)

   **Build Settings:**
   - **Runtime**: `Node`
   - **Build Command**: Leave empty (no build needed)
   - **Start Command**: `node server.js`

   **Instance Type:**
   - **Free** (sufficient for development/testing)

5. **Environment Variables** (Optional):
   - Click "Advanced"
   - Add environment variable:
     - **Key**: `NODE_ENV`
     - **Value**: `production`
   - This ensures the server runs in production mode

6. **Create Web Service**:
   - Click "Create Web Service"
   - Wait for deployment (usually 2-3 minutes)

### Step 4: Get Your Widget URL

Once deployed, you'll get a URL like:
```
https://3dx-widget.onrender.com
```

**Your widget will be accessible at:**
```
https://3dx-widget.onrender.com/widget.html
```

---

## 🔧 Configure in 3DEXPERIENCE Platform

1. Go to your 3DEXPERIENCE Platform
2. Navigate to widget configuration/settings
3. Update the widget URL to:
   ```
   https://3dx-widget.onrender.com/widget.html
   ```
4. Save the configuration
5. Refresh/reload the widget

---

## ✅ Verify Deployment

### Test 1: Direct Browser Access
1. Open `https://your-app.onrender.com/widget.html` in browser
2. Should see the widget interface
3. Status will show "Standalone" (expected - not in 3DX yet)

### Test 2: Check Logs in Render
1. Go to Render Dashboard
2. Click on your service
3. Go to "Logs" tab
4. Should see: `✅ Server running on port XXXX`

### Test 3: In 3DEXPERIENCE
1. Load widget in 3DEXPERIENCE Platform
2. Should now work without ngrok errors
3. Widget status should show "Connected"
4. User info should appear

---

## 🔄 Making Updates

After your widget is deployed, any updates are easy:

1. **Make changes to your code**

2. **Commit and push**:
```bash
git add .
git commit -m "Update widget functionality"
git push
```

3. **Automatic deployment**:
   - Render automatically detects the push
   - Rebuilds and redeploys (takes ~2-3 minutes)
   - No manual intervention needed!

---

## 📊 Monitoring Your Widget

### View Logs
```bash
# In Render Dashboard:
# 1. Click your service
# 2. Go to "Logs" tab
# 3. See real-time logs
```

### Check Metrics
```bash
# In Render Dashboard:
# 1. Click your service
# 2. Go to "Metrics" tab
# 3. See requests, response times, etc.
```

---

## 💡 Tips & Best Practices

### 1. Custom Domain (Optional)
- Go to service settings
- Add custom domain (e.g., `widget.your-company.com`)
- Update DNS records as instructed
- Render provides free SSL for custom domains

### 2. Health Checks
Render automatically monitors your service:
- If it crashes, Render restarts it
- If unhealthy, you get notifications

### 3. Sleep Mode (Free Tier)
⚠️ **Important**: Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Upgrade to paid tier ($7/month) for always-on service

### 4. Environment-Specific Configuration
Add environment variables in Render for:
- API keys
- Configuration flags
- Feature toggles

---

## 🐛 Troubleshooting

### Issue: "Service Failed to Start"
**Check:**
1. Logs in Render dashboard
2. Ensure `package.json` has correct start script
3. Verify Node.js version compatibility

**Fix:**
```bash
# Update package.json engines
"engines": {
  "node": ">=14.0.0"
}
```

### Issue: "Widget Not Loading in 3DX"
**Check:**
1. URL is correct (include `/widget.html`)
2. Service is deployed and running
3. Browser console for errors

### Issue: "CORS Errors"
**Fix:** Already configured in `server.js` with proper headers

### Issue: "Service Sleeps (Free Tier)"
**Options:**
1. Upgrade to paid tier ($7/month)
2. Use external monitoring (ping every 10 minutes)
3. Accept 30-second delay on first load

---

## 💰 Pricing

### Free Tier (Current)
- ✅ 750 hours/month
- ✅ HTTPS included
- ✅ Auto-deploy from Git
- ⚠️ Sleeps after 15 min inactivity
- ✅ 100GB bandwidth/month

### Starter Plan ($7/month)
- ✅ Always on (no sleep)
- ✅ More bandwidth
- ✅ Better performance

---

## 📚 Alternative Files Structure

If you want to organize better:

```
3dx-widget/
├── public/              # Static files
│   ├── widget.html
│   ├── styles.css
│   └── app.js
├── server.js           # Server
├── package.json
├── .gitignore
└── README.md
```

Update `server.js` to serve from `public/` directory if needed.

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs
- **Support**: https://render.com/support

---

## 📞 Next Steps

1. ✅ Deploy to Render
2. ✅ Test your widget URL directly
3. ✅ Configure in 3DEXPERIENCE Platform
4. ✅ Test in 3DX - should work now!
5. 🎉 Continue development

---

## 🎯 For Production

When ready for production use:

1. **Upgrade to Paid Plan** - Remove sleep limitation
2. **Add Custom Domain** - Professional URL
3. **Set Up Monitoring** - Track uptime and performance
4. **Enable Notifications** - Get alerts for issues
5. **Review Logs Regularly** - Monitor for errors

---

## Alternative: Deploy from CLI

If you prefer command line:

```bash
# Install Render CLI
npm install -g @render-io/cli

# Login
render login

# Deploy
render deploy
```

---

## Questions?

- **Render Issues**: Check https://render.com/docs
- **3DEXPERIENCE Integration**: Contact platform team
- **Widget Development**: Review widget.html for examples

Good luck with your deployment! 🚀