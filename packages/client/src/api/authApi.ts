import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './types'
import { SignInRequest, SignUpRequest } from './auth.schema'
import { AUTH_URL } from './consts'

export const authApi = createApi({
  // Временно поставлю другой reducer path, в дальнейшем поправлю
  reducerPath: 'authApi/practicum',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getUser: build.query<User, void>({
      query: () => `user`,
    }),
    signUp: build.mutation<Pick<User, 'id'>, SignUpRequest>({
      query: body => ({
        url: 'signup',
        method: 'POST',
        responseHandler: 'text',
        body,
      }),
    }),
    signIn: build.mutation<void, SignInRequest>({
      query: body => ({
        url: 'signin',
        method: 'POST',
        responseHandler: 'text',
        body,
      }),
    }),
    logout: build.mutation<void, void>({
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
