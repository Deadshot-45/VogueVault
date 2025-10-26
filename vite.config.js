import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Use Vite dev proxy to avoid CORS during local development.
// Requests from the dev server to /api/* will be proxied to the remote API.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // only used for local development (vite dev server)
    proxy: {
      // Proxy any request starting with /api/data to the remote API server
      "^/api/data/": {
        target: "https://vault-vogue-expressjs.vercel.app",
        changeOrigin: true,
        secure: true,
        ws: true,

        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq) => {
            // Set CORS headers
            proxyReq.setHeader(
              "origin",
              "https://vault-vogue-expressjs.vercel.app"
            );
            proxyReq.setHeader(
              "Access-Control-Request-Method",
              "GET,HEAD,PUT,PATCH,POST,DELETE"
            );
            proxyReq.setHeader("Access-Control-Allow-Origin", "true");
          });
          proxy.on("proxyRes", (proxyRes) => {
            // Log proxy response headers for debugging
            console.log("Response headers:", proxyRes.headers);
          });
        },
      },
    },
  },
});
