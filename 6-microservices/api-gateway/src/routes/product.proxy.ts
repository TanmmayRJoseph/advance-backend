import { createProxyMiddleware } from "http-proxy-middleware";

export const productProxy = createProxyMiddleware({
  target: "http://localhost:5002",
  changeOrigin: true,
  pathRewrite: {
    "^/api/product": "",
  },
});
