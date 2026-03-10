import { useGetUserQuery } from './api/authApi'

const App = () => {
  const { data: user, isLoading } = useGetUserQuery()

  return (
    <div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : user ? (
        <div>
          <p>{user.first_name}</p>
          <p>{user.second_name}</p>
        </div>
      ) : (
        <p>Пользователь не найден!</p>
      )}
    </div>
  )
}

export default App
