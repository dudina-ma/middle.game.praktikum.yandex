import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './types'
import { UpdateProfileRequest, ChangePasswordRequest } from './user.schema'
import { API_URL } from './consts'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
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
      invalidatesTags: (_result, _error, _arg) => [
        { type: 'User', id: 'PROFILE' },
      ],
    }),
    updateProfile: builder.mutation<User, UpdateProfileRequest>({
      query: body => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, _arg) => [
        { type: 'User', id: 'PROFILE' },
      ],
    }),
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: body => ({
        url: '/user/password',
        method: 'PUT',
        body,
        responseHandler: async response => {
          if (!response.ok) {
            throw new Error(await response.text())
          }
        },
      }),
    }),
  }),
})

export const {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = userApi
