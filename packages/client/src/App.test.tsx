import App from './App'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store'

const fetchMock = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') } as Response)
)

globalThis.fetch = fetchMock as unknown as typeof fetch

test('App renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
