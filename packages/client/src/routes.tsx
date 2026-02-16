import { AppDispatch, RootState } from './store'
import Layout from './organisms/Layout/Layout'
import Main from './pages/Main/Main'
import SignIn from './pages/SignIn/SignIn'
import { Profile } from './pages/Profile/Profile'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Forum from './pages/Forum/Forum'
import ForumTopic from './pages/ForumTopic/ForumTopic'
import NotFound from './pages/NotFound/NotFound'
import RouterErrorAdapter from './organisms/ErrorBoundary/ErrorBoundary'

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

export enum RoutesEnum {
  Main = '/',
  SignIn = '/login',
  SignUp = '/register',
  Profile = '/profile',
  Game = '/game',
  Leaderboard = '/leaderboard',
  Forum = '/forum',
  Error500 = '/error500',
}

export const routes = [
  {
    path: RoutesEnum.SignIn,
    Component: SignIn,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('Login'),
  },
  {
    path: RoutesEnum.SignUp,
    Component: SignUp,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('SignUp'),
  },
  {
    path: RoutesEnum.Main,
    Component: Layout,
    errorElement: createErrorElement(),
    children: [
      {
        index: true,
        Component: Main,
        fetchData: createStubFetchData('Main'),
      },
      {
        path: RoutesEnum.Profile,
        Component: Profile,
        fetchData: createStubFetchData('Profile'),
      },
      {
        path: RoutesEnum.Game,
        Component: Game,
        fetchData: createStubFetchData('Game'),
      },
      {
        path: RoutesEnum.Leaderboard,
        Component: Leaderboard,
        fetchData: createStubFetchData('Leaderboard'),
      },
      {
        path: RoutesEnum.Forum,
        Component: Forum,
        fetchData: createStubFetchData('Forum'),
      },
      {
        path: `${RoutesEnum.Forum}/:topicId`,
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
]
