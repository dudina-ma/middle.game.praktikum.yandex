import dotenv from 'dotenv'
dotenv.config()

import { HelmetData } from 'react-helmet'
import express, { Request as ExpressRequest } from 'express'
import path from 'path'

import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 80
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'
const NO_SSR = process.env.NO_SSR === 'true' // Флаг для отключения SSR

async function createServer() {
  const app = express()

  app.use(cookieParser())

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // Если SSR отключен - отдаём базовый HTML для SPA
      if (NO_SSR) {
        let template: string

        if (vite) {
          template = await fs.readFile(
            path.resolve(clientPath, 'index.html'),
            'utf-8'
          )
          template = await vite.transformIndexHtml(url, template)
        } else {
          template = await fs.readFile(
            path.join(clientPath, 'dist/client/index.html'),
            'utf-8'
          )
        }

        // Отдаём HTML без SSR данных
        const html = template
          .replace('<!--ssr-styles-->', '')
          .replace('<!--ssr-helmet-->', '')
          .replace('<!--ssr-outlet-->', '')
          .replace('<!--ssr-initial-state-->', '')

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        return
      }

      // Оригинальный SSR код...
      let render: (req: ExpressRequest) => Promise<{
        html: string
        initialState: unknown
        helmet: HelmetData
        styleTags: string
      }>
      let template: string

      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        template = await vite.transformIndexHtml(url, template)

        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.js'
        )

        render = (await import(pathToServer)).render
      }

      const {
        html: appHtml,
        initialState,
        helmet,
        styleTags,
      } = await render(req)

      const html = template
        .replace('<!--ssr-styles-->', styleTags)
        .replace(
          `<!--ssr-helmet-->`,
          `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`
        )
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
    console.log(`SSR mode: ${NO_SSR ? 'DISABLED (SPA mode)' : 'ENABLED'}`)
  })
}

createServer()
