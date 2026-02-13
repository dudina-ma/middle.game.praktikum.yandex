import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AddGameResultRequest,
  AddGameResultResponse,
  FetchLeaderboardRequest,
  FetchLeaderboardResponse,
  LeaderboardEntry,
} from './leaderboard.types'
import { API_URL } from './consts'

const generateMockLeaderboardData = (): LeaderboardEntry[] => {
  const names = [
    'Иван Иванов',
    'Мария Петрова',
    'Алексей Сидоров',
    'Елена Козлова',
    'Дмитрий Волков',
    'Анна Смирнова',
    'Сергей Кузнецов',
    'Ольга Попова',
    'Николай Соколов',
    'Татьяна Лебедева',
    'Владимир Новиков',
    'Екатерина Морозова',
    'Андрей Петров',
    'Наталья Волкова',
    'Павел Соловьев',
  ]

  return names.map((display_name, index) => ({
    data: {
      user_id: index + 1,
      display_name,
      score: 2000 - index * 30 - Math.floor(Math.random() * 50),
      game_time_seconds: 60 + Math.floor(Math.random() * 120),
      total_shots: 20 + Math.floor(Math.random() * 40),
      ships_sunk: 5 + Math.floor(Math.random() * 10),
      date: Date.now() - index * 3600000,
    },
  }))
}

const allMockData = generateMockLeaderboardData()

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Leaderboard'],
  endpoints: builder => ({
    addGameResult: builder.mutation<
      AddGameResultResponse,
      AddGameResultRequest
    >({
      query: body => ({
        url: '/leaderboard',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Leaderboard'],
    }),
    getLeaderboard: builder.query<
      FetchLeaderboardResponse,
      FetchLeaderboardRequest
    >({
      queryFn: async ({ cursor, limit }) => {
        const startIndex = cursor
        const endIndex = startIndex + limit
        const pageData = allMockData.slice(startIndex, endIndex)

        return {
          data: {
            data: pageData,
          },
        }
      },
      providesTags: ['Leaderboard'],
    }),
  }),
})

export const { useAddGameResultMutation, useGetLeaderboardQuery } =
  leaderboardApi
