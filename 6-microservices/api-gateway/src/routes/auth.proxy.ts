import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware({
  target: "http://localhost:5001",
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": "",
  },
});
