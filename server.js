const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Check if we're in production (Render) or local development
const isProduction = process.env.NODE_ENV === 'production' || !fs.existsSync('key.pem');
const PORT = process.env.PORT || 8443;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.woff': 'application/font-woff',
  '.woff2': 'application/font-woff2',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

// Request handler
const requestHandler = (req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Parse URL and set default file
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';  // Default to index.html for status page
  }

  // Remove query string
  const queryStringIndex = filePath.indexOf('?');
  if (queryStringIndex !== -1) {
    filePath = filePath.substring(0, queryStringIndex);
  }

  console.log(`  Attempting to serve: ${filePath}`);
  console.log(`  File exists: ${fs.existsSync(filePath)}`);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  File size: ${stats.size} bytes`);
  }

  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        console.log(`  ❌ File not found: ${filePath}`);
        console.log(`  Current directory: ${__dirname}`);
        console.log(`  Files in directory: ${fs.readdirSync('.').join(', ')}`);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1><p>File: ' + filePath + '</p>', 'utf-8');
      } else {
        // Server error
        console.log(`  ❌ Server error: ${error.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      // Success - Headers optimized for 3DEXPERIENCE Platform embedding
      console.log(`  ✅ Serving file successfully`);
      res.writeHead(200, { 
        'Content-Type': contentType,
        // CORS headers - allow 3DEXPERIENCE domains
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, SecurityToken',
        'Access-Control-Allow-Credentials': 'true',
        // Security headers for iframe embedding
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': "frame-ancestors *",
        // Cache control
        'Cache-Control': isProduction ? 'public, max-age=3600' : 'no-cache, no-store, must-revalidate',
        'Pragma': isProduction ? '' : 'no-cache',
        'Expires': isProduction ? '' : '0'
      });
      res.end(content, 'utf-8');
    }
  });
};

// Create server based on environment
let server;
if (isProduction) {
  // Production: Use HTTP (Render provides HTTPS proxy)
  server = http.createServer(requestHandler);
  console.log('🚀 Production mode: HTTP server (Render handles HTTPS)');
} else {
  // Development: Use HTTPS with self-signed cert
  const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
  server = https.createServer(options, requestHandler);
  console.log('🚀 Development mode: HTTPS server with self-signed cert');
}

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`🎯 Default file: index.html`);
  console.log(`🌍 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  
  // List available files
  console.log('\n📂 Available files:');
  try {
    const files = fs.readdirSync('.');
    files.forEach(file => {
      const stats = fs.statSync(file);
      if (stats.isFile()) {
        console.log(`  - ${file} (${stats.size} bytes)`);
      }
    });
  } catch (e) {
    console.log(`  Error listing files: ${e.message}`);
  }
  
  if (!isProduction) {
    console.log(`\n⚠️  Local development: https://localhost:${PORT}/`);
    console.log(`   Accept self-signed certificate in browser\n`);
  } else {
    console.log(`\n✅ Ready for 3DEXPERIENCE Platform integration`);
    console.log(`📍 Access at: /index.html or /widget.html\n`);
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});