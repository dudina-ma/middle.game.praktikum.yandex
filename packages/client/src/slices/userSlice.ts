import { RootState } from '../store'
import { authApi } from '../api/authApi'

export type { User } from '../api/types'

export const selectUser = (state: RootState) => {
  const result = authApi.endpoints.getUser.select()(state)
  return result.data ?? null
}

export const updateAvatarThunk = (file: File) => {
  return { type: 'user/updateAvatarThunk', payload: file }
}
