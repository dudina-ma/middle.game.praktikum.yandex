import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './types'

const API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

export type UpdateProfileRequest = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

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
    updateProfile: builder.mutation<User, UpdateProfileRequest>({
      query: body => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useUpdateAvatarMutation, useUpdateProfileMutation } = userApi
