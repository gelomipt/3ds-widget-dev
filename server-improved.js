const https = require('https');
const fs = require('fs');
const path = require('path');

// SSL certificate options
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

// Create HTTPS server
https.createServer(options, (req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Parse URL and set default file
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './widget.html';  // Changed default to widget.html
  }

  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      // Success - Headers optimized for 3DEXPERIENCE Platform embedding
      res.writeHead(200, { 
        'Content-Type': contentType,
        // CORS headers - allow 3DEXPERIENCE domains
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        // Security headers for iframe embedding
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': "frame-ancestors *",
        // Prevent caching during development
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content, 'utf-8');
    }
  });
}).listen(8443);

console.log('🚀 3DEXPERIENCE Widget Server running at https://localhost:8443/');
console.log('📁 Serving files from:', __dirname);
console.log('🎯 Default widget: widget.html');
console.log('\n⚠️  Note: You\'ll need to accept the self-signed certificate in your browser');
console.log('   Chrome: Type "thisisunsafe" when you see the warning');
console.log('   Firefox: Click "Advanced" > "Accept the Risk and Continue"');
console.log('\n💡 For 3DEXPERIENCE Platform:');
console.log('   1. Use ngrok to expose this server: ngrok http https://localhost:8443');
console.log('   2. Use the ngrok URL WITHOUT the free warning page');
console.log('   3. Consider upgrading to ngrok paid plan to avoid injection scripts\n');
