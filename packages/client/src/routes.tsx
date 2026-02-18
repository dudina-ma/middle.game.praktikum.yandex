import { AppDispatch, RootState } from './store'
import Layout from './organisms/Layout/Layout'
import Main from './pages/Main/Main'
import SignIn from './pages/SignIn/SignIn'
import { initProfilePage, Profile } from './pages/Profile/Profile'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import ForumPage from './pages/ForumPage'
import NotFound from './pages/NotFound/NotFound'
import ServerError from './pages/ServerError/ServerError'
import SignUp from './pages/SignUp/SignUp'
import BadRequest from './pages/BadRequest/BadRequest'
import { RouterErrorAdapter } from './components/ErrorBoundary/RouterErrorAdapter'

const createErrorElement = () => <RouterErrorAdapter />

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

// РћР±С‰РёРµ Р·Р°РіР»СѓС€РєРё
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
    Component: SignIn,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('Login'),
  },
  {
    path: '/register',
    Component: SignUp,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('SignUp'),
  },
  {
    path: '/server-error',
    Component: ServerError,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('ServerError'),
  },
  {
    path: '/bad-request',
    Component: BadRequest,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('BadRequest'),
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
