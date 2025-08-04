# JioTV Ultra Proxy 🚀

This is an ultra-fast reverse proxy for JioTV streams with:

- ⚡ Smart in-memory caching (30 seconds)
- 💨 Brotli/Gzip compression for performance
- 🔁 Reverse proxy path rewriting
- 🛡️ Custom headers for better compatibility

## 📦 Proxy Example

```
https://your-app.onrender.com/jiotv/discoverybengali/master.m3u8
```

It will fetch content from:
```
https://live.dinesh29.com.np/stream/jiotv/discoverybengali/master.m3u8
```

## 🛠 Setup (for Render.com)

1. Upload the ZIP to [Render](https://render.com/).
2. Create a new **Web Service**.
3. Use `render.yaml` for auto configuration.
4. Deploy and start streaming fast 🚀

## 📁 Project Structure

```
📁 jiotv-ultra-proxy
├── server.js
├── package.json
├── render.yaml
└── README.md
```

## 🙌 Credits

Made with ❤️ for blazing-fast IPTV proxying.