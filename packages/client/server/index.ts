import path from 'path'
import { HelmetData } from 'react-helmet'
import express, {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import cookieParser from 'cookie-parser'
import { authGuard } from './services/authGuard'
// import { internalProxy, yandexProxy } from './services/proxy'

const port = process.env.PORT || 3000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

export interface RenderArgs {
  html: string
  initialState: unknown
  helmet: HelmetData
  styleTags: string
}

async function requestHandler(vite?: ViteDevServer) {
  return async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
  ) => {
    const url = req.originalUrl

    try {
      let render: (req: ExpressRequest) => Promise<RenderArgs>
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

      const helmetTags = `
        ${helmet.meta.toString()} 
        ${helmet.title.toString()} 
        ${helmet.link.toString()}
      `

      const serializedState = serialize(initialState, {
        isJSON: true,
      })

      const initialStateScript = `<script>
        window.APP_INITIAL_STATE = ${serializedState}
      </script>`

      const html = template
        .replace(`<!--ssr-styles-->`, styleTags)
        .replace(`<!--ssr-helmet-->`, helmetTags)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--ssr-initial-state-->`, initialStateScript)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  }
}

async function createServer() {
  const staticPath = path.join(clientPath, 'dist/client')
  const app = express()
  let vite: ViteDevServer | undefined

  app.use(cookieParser())

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else if (existsSync(staticPath)) {
    app.use(express.static(staticPath, { index: false }))
  }

  // app.use('/yandex', yandexProxy)
  // app.use('/api', internalProxy)

  app.get('*', authGuard, await requestHandler(vite))

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
    console.log(`Server mode: ${isDev ? 'development' : 'production'}`)
    console.log(`Client path: ${clientPath}`)
  })
}

createServer()
