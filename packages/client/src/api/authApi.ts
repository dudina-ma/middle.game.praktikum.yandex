import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './types'

const API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

const userInfo: User = {
  id: 1,
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'ivan_user',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67',
  login: 'ivan_user',
  avatar: 'https://picsum.photos/150/150',
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      queryFn: async () => {
        return { data: userInfo }
      },
      providesTags: ['User'],
    }),
  }),
})

export const { useGetUserQuery } = authApi
