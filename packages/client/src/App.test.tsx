import App from './App'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('App renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
