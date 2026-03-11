import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OAUTHYANDEX_URL, REDIRECT_URI } from './consts'

type OauthData = {
  code: string
  redirect_uri: string
}

export const oauthYandexApi = createApi({
  reducerPath: 'oauthYandexApi',
  baseQuery: fetchBaseQuery({
    credentials: 'include',
  }),
  endpoints: build => ({
    getServiceId: build.query<Record<'service_id', string>, void>({
      query: () => ({
        url: `${OAUTHYANDEX_URL}/service-id`,
        params: {
          redirect_uri: REDIRECT_URI,
        },
      }),
    }),
    signInYandex: build.mutation<void, OauthData>({
      query: body => ({
        url: `${OAUTHYANDEX_URL}`,
        method: 'POST',
        body,
        responseHandler: response => response.text(),
      }),
    }),
  }),
})

export const { useGetServiceIdQuery, useSignInYandexMutation } = oauthYandexApi
