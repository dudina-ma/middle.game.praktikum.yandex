import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { routes } from './routes'
import App from './App'
const router = createBrowserRouter(routes)

const rootElement = document.getElementById('root') as HTMLElement

// Проверяем, есть ли SSR контент для гидрации
const hasSSRContent =
  rootElement.children.length > 0 || rootElement.innerHTML.trim() !== ''

// Проверяем наличие initial state от SSR
const hasInitialState = window.APP_INITIAL_STATE !== undefined

if (hasSSRContent && hasInitialState) {
  // SSR режим - используем hydrateRoot

  ReactDOM.hydrateRoot(
    rootElement,
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
} else {
  // SPA режим - используем createRoot

  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
