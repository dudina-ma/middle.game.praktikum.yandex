import { AppDispatch, RootState } from './store'
import Layout from './components/Layout/Layout'
import Main from './pages/Main/Main'
import Login from './pages/Login/Login'
import SignIn from './pages/SignIn/SignIn'
import { Profile, initProfilePage } from './pages/Profile/Profile'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Forum from './pages/Forum/Forum'
import ForumTopic from './pages/ForumTopic/ForumTopic'
import NotFound from './pages/NotFound/NotFound'

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
  return async (): Promise<void> => {
    console.log(`Stub fetchData called for ${pageName} page`)
    return Promise.resolve()
  }
}

export const emptyFetchData = async (): Promise<void> => {
  return Promise.resolve()
}

export const routes = [
  {
    path: '/login',
    Component: Login,
    fetchData: createStubFetchData('Login'),
  },
  {
    path: '/sign-in',
    Component: SignIn,
    fetchData: createStubFetchData('SignIn'),
  },

  {
    path: '/',
    Component: Layout,
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
    fetchData: emptyFetchData,
  },
  {
    path: '/profile',
    Component: Profile,
    fetchData: initProfilePage,
  },
]
