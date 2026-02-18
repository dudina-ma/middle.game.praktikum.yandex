import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { routes } from './routes'
import './index.css'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

import { OfflineBanner } from './organisms/OfflineBanner/OfflineBanner'

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
    <ErrorBoundary>
      <Provider store={store}>
        <OfflineBanner />
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  )
} else {
  // SPA режим - используем createRoot

  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <OfflineBanner />
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  )
}

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch((error: Error) => {
          console.log('ServiceWorker registration failed: ', error)
        })
    })
  }
}

startServiceWorker()
