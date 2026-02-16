import { Helmet } from 'react-helmet'

import { useSelector } from '../store'
import Header from '../organisms/Header/Header'
import {
  fetchFriendsThunk,
  selectFriends,
  selectIsLoadingFriends,
} from '../slices/friendsSlice'
import { selectUser } from '../slices/userSlice'
import { useGetUserQuery } from '../api/authApi'
import { PageInitArgs } from '../routes'
import { usePage } from '../hooks/usePage'

export const FriendsPage = () => {
  const friends = useSelector(selectFriends)
  const isLoading = useSelector(selectIsLoadingFriends)
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery()
  const userFromSelector = useSelector(selectUser)
  const displayUser = user || userFromSelector

  usePage({ initPage: initFriendsPage })
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Список друзей</title>
        <meta
          name="description"
          content="Страница со списком друзей и с информацией о пользователе"
        />
      </Helmet>
      <Header />
      {isLoadingUser ? (
        <h3>Загрузка информации о пользователе...</h3>
      ) : displayUser ? (
        <>
          <h3>Информация о пользователе:</h3>{' '}
          <p>
            {displayUser.first_name} {displayUser.second_name}
          </p>
        </>
      ) : (
        <h3>Пользователь не найден</h3>
      )}
      {isLoading ? (
        'Загрузка списка...'
      ) : (
        <ul>
          {friends.map(friend => (
            <li key={friend.name}>
              {friend.name} {friend.secondName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const initFriendsPage = async ({ dispatch, state }: PageInitArgs) => {
  const queue: Array<Promise<unknown>> = [dispatch(fetchFriendsThunk())]
  if (!selectUser(state)) {
    const { authApi } = await import('../api/authApi')
    queue.push(dispatch(authApi.endpoints.getUser.initiate()))
  }
  return Promise.all(queue)
}
