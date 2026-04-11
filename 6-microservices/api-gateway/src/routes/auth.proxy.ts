import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware({
  target: "http://auth-service:5001",
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": "",
  },

  // Only for POST requests ,PATCH and PUT requests
  on: {
    proxyReq: (proxyReq, req: any, res) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);

        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

        proxyReq.write(bodyData);
      }
    },
  },
});
