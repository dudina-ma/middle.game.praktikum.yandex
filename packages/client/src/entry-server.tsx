import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { matchRoutes } from 'react-router-dom'

import {
  createContext,
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import { routes } from './routes'
import './index.css'
import { setPageHasBeenInitializedOnServer } from './slices/ssrSlice'
import { store } from './store'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)
  const url = createUrl(req)

  if (context instanceof Response) {
    throw context
  }

  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes

  try {
    await fetchData({
      dispatch: store.dispatch,
      state: store.getState(),
      ctx: createContext(req),
    })
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context)
  const sheet = new ServerStyleSheet()

  try {
    const html = ReactDOM.renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <StaticRouterProvider router={router} context={context} />
        </Provider>
      )
    )

    const styleTags = sheet.getStyleTags()
    const helmet = Helmet.renderStatic()

    return {
      html,
      helmet,
      styleTags,
      initialState: store.getState(),
    }
  } finally {
    sheet.seal()
  }
}
