const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Consistent baseline state matching problem statement
let systemState = {
  averageWaitDays: 21.4,
  capacityLoadPercent: 185,
  openReferrals: 340,
  departmentsConnected: 12,
  priorityCohortCases: 130,
  status: "BASELINE",
  lastUpdated: new Date().toLocaleTimeString()
};

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. GET /api/status
  if (req.url === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(systemState));
    return;
  }

  // 2. POST /api/simulate
  if (req.url === '/api/simulate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { clinical, peer, digital, dining } = JSON.parse(body || '{}');
        const clinicalSlots = Number(clinical) || 12;
        const peerCount = Number(peer) || 15;
        const digitalLicenses = Number(digital) || 50;
        const diningExtended = Number(dining) === 1;

        // Model calculations
        const clinicalFactor = 12 / clinicalSlots;
        const offloadRatio = Math.min(0.70, ((peerCount - 15) * 0.005) + ((digitalLicenses - 50) * 0.0016));
        const diningFactor = diningExtended ? 0.85 : 1.0;

        let projectedWait = 21.4 * (1 - offloadRatio) * clinicalFactor * diningFactor;
        projectedWait = Math.max(1.8, Math.round(projectedWait * 10) / 10);

        let projectedLoad = 185 * (1 - offloadRatio) * clinicalFactor * diningFactor;
        projectedLoad = Math.max(42, Math.round(projectedLoad));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          projectedWaitDays: projectedWait.toFixed(1),
          projectedLoadPercent: projectedLoad
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON payload" }));
      }
    });
    return;
  }

  // 3. POST /api/orchestrate
  if (req.url === '/api/orchestrate' && req.method === 'POST') {
    systemState.averageWaitDays = 1.8;
    systemState.capacityLoadPercent = 42;
    systemState.openReferrals = 110;
    systemState.status = "REBALANCED";
    systemState.lastUpdated = new Date().toLocaleTimeString();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: "ServiceNow workflow prototype executed successfully",
      updatedState: systemState
    }));
    return;
  }

  // Static File Serving
  let relativePath = req.url === '/' ? 'index.html' : req.url.replace(/^\//, '');
  let filePath = path.join(PUBLIC_DIR, relativePath);

  // Fallback to public/index.html for SPA routing
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Synapse360] Server running at http://localhost:${PORT}/`);
});
