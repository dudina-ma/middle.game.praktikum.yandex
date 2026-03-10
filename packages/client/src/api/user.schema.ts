import { User } from './types'

export type UpdateProfileRequest = Omit<User, 'id' | 'avatar'>

export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: string
}
