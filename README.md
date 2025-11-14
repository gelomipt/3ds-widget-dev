# 3DEXPERIENCE Widget Development Server

Local HTTPS development environment for creating widgets for the 3DEXPERIENCE Platform.

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   node server.js
   ```
   or
   ```bash
   npm start
   ```

2. **Access your widget:**
   Open https://localhost:8443/ in your browser

3. **Accept the certificate:**
   - **Chrome**: When you see "Your connection is not private", type `thisisunsafe` (no input box will appear, just type it)
   - **Firefox**: Click "Advanced" → "Accept the Risk and Continue"
   - **Edge**: Click "Advanced" → "Continue to localhost (unsafe)"

## 📁 Project Structure

```
3dx-widget-dev/
├── server.js          # HTTPS server
├── index.html         # Sample widget page
├── cert.pem          # SSL certificate
├── key.pem           # SSL private key
├── package.json      # Project configuration
└── README.md         # This file
```

## 🔧 Configuration

- **Port**: 8443 (HTTPS)
- **Certificate**: Self-signed (valid for 365 days)
- **CORS**: Enabled for all origins

## 📝 Widget Development

### Basic Widget Structure

```html
<!DOCTYPE html>
<html>
<head>
    <title>My 3DX Widget</title>
    <script type="text/javascript">
        // Widget initialization
        var myWidget = {
            onLoad: function() {
                // Initialize your widget
                console.log('Widget loaded');
            }
        };
        
        // Set preferences
        widget.setPreference('myPreference', 'value');
        
        // Get preferences
        var value = widget.getValue('myPreference');
    </script>
</head>
<body>
    <!-- Your widget content -->
</body>
</html>
```

### 3DEXPERIENCE Platform Integration

When deploying to 3DEXPERIENCE:

1. **Widget Manifest**: Create a widget definition in 3DSpace
2. **URL Configuration**: Point to your widget's URL
3. **Preferences**: Define widget preferences in the platform
4. **Events**: Use widget events for communication

### Common Widget APIs

```javascript
// Get widget preference
widget.getValue('preferenceName');

// Set widget preference
widget.setValue('preferenceName', 'value');

// Add event listener
widget.addEvent('onLoad', function() {
    console.log('Widget loaded');
});

// Get user information
widget.user.login;
widget.user.firstname;
widget.user.lastname;
```

## 🔗 Integration with DELMIA/ITEROP

For integration with ITEROP or DELMIA solutions:

1. Configure authentication for 3DEXPERIENCE Platform
2. Use REST APIs to communicate with ITEROP services
3. Implement proper CORS handling
4. Use secure tokens for API calls

## 🛠️ Development Tips

1. **Hot Reload**: Refresh the browser to see changes
2. **Console Logging**: Use browser DevTools (F12) for debugging
3. **Network Tab**: Monitor API calls in DevTools
4. **Local Storage**: Test widget preferences locally

## 📦 Adding More Files

Simply add your JavaScript, CSS, images, or other files to the project directory. The server will serve them automatically:

- `styles.css` → https://localhost:8443/styles.css
- `app.js` → https://localhost:8443/app.js
- `images/logo.png` → https://localhost:8443/images/logo.png

## 🔐 Security Notes

- This is a **development server only**
- Self-signed certificates should not be used in production
- For production, use proper SSL certificates from a trusted CA
- Consider using environment-specific configurations

## 🌐 CORS Configuration

The server includes CORS headers by default:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## 🐛 Troubleshooting

### Certificate Issues
If you continue to see certificate warnings:
1. Clear browser cache and cookies
2. Close and restart your browser
3. Regenerate certificates: `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes`

### Port Already in Use
If port 8443 is busy, edit `server.js` and change the port number:
```javascript
.listen(8443);  // Change this to another port like 9443
```

### Connection Refused
Make sure the server is running and check firewall settings.

## 📚 Resources

- [3DEXPERIENCE Platform Documentation](https://www.3ds.com)
- [DELMIA Documentation](https://www.3ds.com/products-services/delmia/)
- [Widget Development Guide](https://media.3ds.com)

## 🚀 Next Steps

1. Develop your widget functionality
2. Test with 3DEXPERIENCE Platform sandbox
3. Configure authentication for 3DSpace
4. Deploy to production environment
