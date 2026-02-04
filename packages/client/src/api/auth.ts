import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './types'
import { SignInRequest, SignUpRequest } from './auth.schema'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/auth/',
    credentials: 'include',
  }),
  endpoints: build => ({
    getUser: build.query<User, null>({
      query: () => `user`,
    }),
    signUp: build.mutation<Pick<User, 'id'>, SignUpRequest>({
      query: body => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation<void, SignInRequest>({
      query: body => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<void, null>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useLogoutMutation,
  useSignUpMutation,
  useSignInMutation,
} = authApi
