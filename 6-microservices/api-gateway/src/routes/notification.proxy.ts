import { createProxyMiddleware } from "http-proxy-middleware";

export const notificationProxy = createProxyMiddleware({
  target: "http://notification-service:5004",
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": "",
  },
});
