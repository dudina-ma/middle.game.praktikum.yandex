import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { routes } from './routes'
import './index.css'
const isDev = process.env.NODE_ENV === 'development'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

import { OfflineBanner } from './organisms/OfflineBanner/OfflineBanner'

const router = createBrowserRouter(routes)
const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.hydrateRoot(
  rootElement,
  <ErrorBoundary>
    <Provider store={store}>
      <OfflineBanner />
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>
)

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    const onLoad = () => {
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
    }
    window.addEventListener('load', onLoad, { once: true })
  }
}

if (!isDev) startServiceWorker()
