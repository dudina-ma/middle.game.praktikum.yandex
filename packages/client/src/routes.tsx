import { AppDispatch, RootState } from './store'

import { initMainPage, MainPage } from './pages/Main'
import { FriendsPage, initFriendsPage } from './pages/FriendsPage'
import { initNotFoundPage, NotFoundPage } from './pages/NotFound'
import { SignIn } from './organisms/SignIn/SignIn'

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

export const routes = [
  {
    path: '/',
    Component: MainPage,
    fetchData: initMainPage,
  },
  {
    path: '/friends',
    Component: FriendsPage,
    fetchData: initFriendsPage,
  },
  {
    path: '/signin',
    Component: SignIn,
    fetchData: initMainPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
    fetchData: initNotFoundPage,
  },
]
