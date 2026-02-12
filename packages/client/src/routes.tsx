import { AppDispatch, RootState } from './store'
import Layout from './components/Layout/Layout'
import Main from './pages/Main/Main'
import SignIn from './pages/SignIn/SignIn'
import { initProfilePage, Profile } from './pages/Profile/Profile'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Forum from './pages/Forum/Forum'
import ForumTopic from './pages/ForumTopic/ForumTopic'
import NotFound from './pages/NotFound/NotFound'
import { RouterErrorAdapter } from './components/ErrorBoundary/RouterErrorAdapter'
import SignUp from './pages/SignUp/SignUp'

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
