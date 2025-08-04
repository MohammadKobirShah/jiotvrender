const express = require("express");
const compression = require("compression");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

// Enable Brotli/Gzip compression
app.use(compression());

// Direct proxy route without cache
app.use(
  "/jiotv",
  createProxyMiddleware({
    target: "https://live.dinesh29.com.np/stream/jiotv",
    changeOrigin: true,
    pathRewrite: {
      "^/jiotv": "",
    },
    secure: false,
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("X-Forwarded-For", req.ip);
    },
  })
);

app.get("/", (req, res) => {
  res.send("🔁 Ultra-Fast JioTV Proxy (No Cache, With Compression) is Live");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`));
