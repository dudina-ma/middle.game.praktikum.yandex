import { useSelector } from './store'

import { selectUser } from './slices/userSlice'
import { useGetUserQuery } from './api/authApi'

const App = () => {
  const { data: user, isLoading } = useGetUserQuery()
  const userFromSelector = useSelector(selectUser)

  const displayUser = user || userFromSelector

  return (
    <div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : displayUser ? (
        <div>
          <p>{displayUser.first_name}</p>
          <p>{displayUser.second_name}</p>
        </div>
      ) : (
        <p>Пользователь не найден!</p>
      )}
    </div>
  )
}

export default App
