import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://rest.pubmlst.org',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      secure: true,
    })
  );
}
