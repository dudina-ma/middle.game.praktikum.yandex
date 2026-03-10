import { User } from './types'

export type SignUpRequest = Omit<User, 'id' | 'avatar' | 'display_name'>

export type SignInRequest = {
  login: string
  password: string
}
