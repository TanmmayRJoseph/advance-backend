import { createProxyMiddleware } from "http-proxy-middleware";

export const orderProxy = createProxyMiddleware({
  target: "http://localhost:5003",
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": "",
  },
});
