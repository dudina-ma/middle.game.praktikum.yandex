import { User } from './types'

export type SignUpRequest = Omit<User, 'id' | 'avatar'>

export type SignInRequest = {
  email: string
  password: string
}
