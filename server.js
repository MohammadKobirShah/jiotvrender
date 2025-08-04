const express = require("express");
const compression = require("compression");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

// Enable Brotli/Gzip compression
app.use(compression());

// Simple in-memory cache (expires in 30 seconds)
const cache = new Map();
const CACHE_DURATION_MS = 30000;

app.use("/jiotv", async (req, res, next) => {
  const fullUrl = req.originalUrl;
  const now = Date.now();

  if (cache.has(fullUrl)) {
    const { timestamp, data, headers } = cache.get(fullUrl);
    if (now - timestamp < CACHE_DURATION_MS) {
      console.log("⏪ Cache hit:", fullUrl);
      for (const key in headers) {
        res.setHeader(key, headers[key]);
      }
      return res.send(data);
    } else {
      cache.delete(fullUrl);
    }
  }

  const proxy = createProxyMiddleware({
    target: "https://live.dinesh29.com.np/stream/jiotv",
    changeOrigin: true,
    pathRewrite: {
      "^/jiotv": "",
    },
    secure: false,
    selfHandleResponse: true,
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("X-Forwarded-For", req.ip);
    },
    onProxyRes: async (proxyRes, req, res) => {
      let body = Buffer.from([]);
      proxyRes.on("data", chunk => {
        body = Buffer.concat([body, chunk]);
      });
      proxyRes.on("end", () => {
        const headers = { ...proxyRes.headers };
        cache.set(fullUrl, { timestamp: Date.now(), data: body, headers });
        for (const key in headers) {
          res.setHeader(key, headers[key]);
        }
        res.status(proxyRes.statusCode).send(body);
      });
    },
  });
  proxy(req, res, next);
});

app.get("/", (req, res) => {
  res.send("🔁 Ultra-Fast JioTV Proxy with Cache & Compression is Live");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`));
