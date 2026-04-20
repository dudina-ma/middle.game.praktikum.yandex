import { VITE_APP_DOMAIN, BACKEND_SERVER_URL } from './../api/consts'
import { YANDEX_API_URL } from '../api/consts'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const yandexProxy = createProxyMiddleware({
  target: YANDEX_API_URL,
  changeOrigin: true,
  pathRewrite: { '^/yandex': '' },
  cookieDomainRewrite: VITE_APP_DOMAIN,
})

export const internalProxy = createProxyMiddleware({
  target: BACKEND_SERVER_URL + '/api',
  changeOrigin: true,
  cookieDomainRewrite: VITE_APP_DOMAIN,
})
