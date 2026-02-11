import { AppDispatch, RootState } from './store'
import Layout from './organisms/Layout/Layout'
import Main from './pages/Main/Main'
import Login from './pages/Login/Login'
import SignIn from './pages/SignIn/SignIn'
import { Profile, initProfilePage } from './pages/Profile/Profile'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Forum from './pages/Forum/Forum'
import ForumTopic from './pages/ForumTopic/ForumTopic'
import NotFound from './pages/NotFound/NotFound'
import { RouterErrorAdapter } from './organisms/ErrorBoundary/RouterErrorAdapter'

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
        Component: Forum,
        fetchData: createStubFetchData('Forum'),
      },
      {
        path: 'forum/:topicId',
        Component: ForumTopic,
        fetchData: createStubFetchData('ForumTopic'),
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
