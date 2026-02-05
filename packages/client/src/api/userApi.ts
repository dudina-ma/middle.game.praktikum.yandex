import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './types'

const API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    updateAvatar: builder.mutation<User, File>({
      query: file => {
        const formData = new FormData()
        formData.append('avatar', file)
        return {
          url: '/user/profile/avatar',
          method: 'PUT',
          body: formData,
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useUpdateAvatarMutation } = userApi
