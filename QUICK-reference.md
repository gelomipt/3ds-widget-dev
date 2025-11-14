# Quick Reference - Render Deployment

## 🚀 Fast Track Deployment (5 Minutes)

### 1️⃣ Push to GitHub
```bash
cd 3dx-widget-dev
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/3dx-widget.git
git push -u origin main
```

### 2️⃣ Deploy on Render
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Start Command**: `node server.js`
   - **Instance Type**: Free
5. Click "Create Web Service"

### 3️⃣ Use in 3DEXPERIENCE
Your widget URL: `https://YOUR-APP.onrender.com/widget.html`

---

## 📝 Essential Commands

### Local Testing
```bash
node server.js
# Opens on https://localhost:8443
```

### Update & Deploy
```bash
git add .
git commit -m "Your message"
git push
# Render auto-deploys in 2-3 minutes
```

---

## 🔗 URLs You Need

- **Render Dashboard**: https://dashboard.render.com
- **GitHub**: https://github.com
- **Your Widget**: https://YOUR-APP.onrender.com/widget.html

---

## ⚠️ Important Notes

1. **Free Tier**: Service sleeps after 15 min inactivity
2. **First Load**: May take 30 seconds to wake up
3. **Auto-Deploy**: Every git push triggers deployment
4. **HTTPS**: Provided automatically by Render
5. **No Script Injection**: Unlike ngrok free tier

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Service won't start | Check Render logs for errors |
| Widget not loading | Verify URL includes `/widget.html` |
| Slow first load | Normal on free tier (service sleeping) |
| Want always-on | Upgrade to $7/month plan |

---

## 📊 Service Configuration

**Recommended Settings:**
- Runtime: Node
- Build Command: (empty)
- Start Command: `node server.js`
- Region: Choose nearest to your 3DX instance
- Branch: main

---

## 🎯 Production Checklist

- [ ] Deploy to Render
- [ ] Test widget URL directly in browser
- [ ] Configure URL in 3DEXPERIENCE Platform
- [ ] Test widget in 3DX
- [ ] Monitor logs for errors
- [ ] Consider upgrading to paid tier for production

---

## 💡 Pro Tips

1. **Custom Domain**: Add in Render settings (free SSL included)
2. **Environment Variables**: Add in Render dashboard
3. **View Logs**: Dashboard → Your Service → Logs tab
4. **Metrics**: Dashboard → Your Service → Metrics tab
5. **Rollback**: Dashboard → Your Service → Events → Redeploy old version

---

## 📱 Mobile Workflow

Can't access computer? Deploy from phone:
1. Use GitHub mobile app to push code
2. Render automatically deploys
3. Test on mobile browser

---

## 🔄 Development Workflow

```
1. Edit code locally
2. Test: node server.js
3. git add . && git commit -m "Update"
4. git push
5. Wait 2-3 min for Render to deploy
6. Test in 3DEXPERIENCE
```

---

## 📞 Support Resources

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- GitHub Help: https://docs.github.com

---

## ⏱️ Deployment Time

- Initial setup: 5-10 minutes
- Each update: 2-3 minutes auto-deploy
- Service wake (free tier): ~30 seconds

---

That's it! You're ready to deploy. 🎉