import { AppDispatch, RootState } from './store'
import Layout from './organisms/Layout/Layout'
import Main from './pages/Main/Main'
import SignIn from './pages/SignIn/SignIn'
import { Profile } from './pages/Profile/Profile'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import ForumPage from './pages/ForumPage'
import NotFound from './pages/NotFound/NotFound'
import ServerError from './pages/ServerError/ServerError'
import SignUp from './pages/SignUp/SignUp'
import { RoutesEnum } from './paths'
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
    path: RoutesEnum.ServerError,
    Component: ServerError,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('ServerError'),
  },
  {
    path: RoutesEnum.BadRequest,
    Component: BadRequest,
    errorElement: createErrorElement(),
    fetchData: createStubFetchData('BadRequest'),
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
]
