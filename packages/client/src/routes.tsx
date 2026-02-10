import { RouterErrorAdapter } from './components/ErrorBoundary/RouterErrorAdapter'
import Layout from './components/Layout/Layout'
import BadRequest from './pages/BadRequest/BadRequest'
import ForumPage from './pages/ForumPage'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import NotFound from './pages/NotFound/NotFound'
import { Profile, initProfilePage } from './pages/Profile/Profile'
import SignIn from './pages/SignIn/SignIn'
import { AppDispatch, RootState } from './store'

const createErrorElement = () => <RouterErrorAdapter />

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

// Общие заглушки
export const createStubFetchData = (pageName: string) => {
  return async (_pageArgs: PageInitArgs): Promise<void> => {
    console.log(`Stub fetchData called for ${pageName} page`)
    return Promise.resolve()
  }
}

export const emptyFetchData = async (
  _pageArgs: PageInitArgs
): Promise<void> => {
  return Promise.resolve()
}

export const routes = [
  {
    path: '/login',
    Component: Login,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('Login'),
  },
  {
    path: '/sign-in',
    Component: SignIn,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('SignIn'),
  },
  {
    path: '/',
    Component: Layout,
    errorElement: createErrorElement(),
    children: [
      {
        index: true,
        Component: Main,
        fetchData: createStubFetchData('Main'),
      },
      {
        path: 'profile',
        Component: Profile,
        fetchData: createStubFetchData('Profile'),
      },
      {
        path: 'game',
        Component: Game,
        fetchData: createStubFetchData('Game'),
      },
      {
        path: 'leaderboard',
        Component: Leaderboard,
        fetchData: createStubFetchData('Leaderboard'),
      },
      {
        path: 'forum',
        Component: ForumPage,
        fetchData: createStubFetchData('Forum'),
      },
      {
        path: 'bad-request',
        Component: BadRequest,
        fetchData: createStubFetchData('BadRequest'),
      },
    ],
    fetchData: createStubFetchData('Layout'),
  },

  {
    path: '*',
    Component: NotFound,
    errorElement: createErrorElement(),
    fetchData: emptyFetchData,
  },
  {
    path: '/profile',
    Component: Profile,
    fetchData: initProfilePage,
  },
]
