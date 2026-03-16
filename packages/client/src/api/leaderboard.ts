import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AddGameResultRequest,
  AddGameResultResponse,
  FetchLeaderboardRequest,
  FetchLeaderboardResponse,
  LeaderboardEntry,
} from './leaderboard.types'
import { API_URL, LEADERBOARD_TEAM_NAME } from './consts'

const FALLBACK_STORAGE_KEY = `${LEADERBOARD_TEAM_NAME}:leaderboard`

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const isGameResultData = (
  value: unknown
): value is LeaderboardEntry['data'] => {
  return (
    isRecord(value) &&
    typeof value.user_id === 'number' &&
    typeof value.score === 'number' &&
    typeof value.date === 'number' &&
    (typeof value.display_name === 'undefined' ||
      typeof value.display_name === 'string')
  )
}

const isLocalSaveFallbackError = (error: unknown): boolean => {
  if (!isFetchBaseQueryError(error)) {
    return false
  }

  if (typeof error.status === 'number') {
    return [0, 401, 403].includes(error.status)
  }

  return (
    error.status === 'FETCH_ERROR' ||
    (error.status === 'PARSING_ERROR' &&
      'originalStatus' in error &&
      [401, 403].includes(Number(error.originalStatus)))
  )
}

const readFallbackLeaderboard = (): LeaderboardEntry[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(FALLBACK_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      item =>
        item &&
        typeof item === 'object' &&
        'data' in item &&
        item.data &&
        typeof item.data === 'object'
    ) as LeaderboardEntry[]
  } catch {
    return []
  }
}

const writeFallbackLeaderboard = (entries: LeaderboardEntry[]): void => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(entries))
}

const upsertFallbackLeaderboard = (request: AddGameResultRequest): void => {
  const currentEntries = readFallbackLeaderboard()
  const playerId = request.data.user_id
  const currentValue = request.data.score

  if (typeof currentValue !== 'number') {
    return
  }

  const existingIndex = currentEntries.findIndex(
    entry => entry.data.user_id === playerId
  )

  if (existingIndex === -1) {
    writeFallbackLeaderboard([
      ...currentEntries,
      {
        data: request.data,
      },
    ])
    return
  }

  const existingValue = currentEntries[existingIndex].data.score

  if (typeof existingValue === 'number' && existingValue >= currentValue) {
    return
  }

  const updated = [...currentEntries]
  updated[existingIndex] = { data: request.data }
  writeFallbackLeaderboard(updated)
}

const normalizeLeaderboardEntry = (item: unknown): LeaderboardEntry | null => {
  if (!isRecord(item)) {
    return null
  }

  const payload = 'data' in item ? item.data : item

  if (!isGameResultData(payload)) {
    return null
  }

  return {
    data: payload,
  }
}

const normalizeLeaderboardResponse = (
  data: unknown
): FetchLeaderboardResponse => {
  const rawEntries = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray(data.items)
    ? data.items
    : isRecord(data) && Array.isArray(data.leaderboard)
    ? data.leaderboard
    : isRecord(data) && Array.isArray(data.data)
    ? data.data
    : []

  return rawEntries.reduce<FetchLeaderboardResponse>((acc, item) => {
    const normalizedItem = normalizeLeaderboardEntry(item)

    if (normalizedItem) {
      acc.push(normalizedItem)
    }

    return acc
  }, [])
}

const leaderboardBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
})

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery: leaderboardBaseQuery,
  tagTypes: ['Leaderboard'],
  endpoints: builder => ({
    addGameResult: builder.mutation<
      AddGameResultResponse,
      AddGameResultRequest
    >({
      queryFn: async (body, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/leaderboard',
          method: 'POST',
          body,
        })

        if (!result.error) {
          return { data: undefined }
        }

        if (isLocalSaveFallbackError(result.error)) {
          upsertFallbackLeaderboard(body)
          return { data: undefined }
        }

        return { error: result.error }
      },
      invalidatesTags: ['Leaderboard'],
    }),
    getLeaderboard: builder.query<
      FetchLeaderboardResponse,
      FetchLeaderboardRequest
    >({
      queryFn: async (
        { teamName, ratingFieldName, cursor, limit },
        _api,
        _extraOptions,
        baseQuery
      ) => {
        const result = await baseQuery({
          url: `/leaderboard/${teamName}`,
          method: 'POST',
          body: {
            ratingFieldName,
            cursor,
            limit,
          },
        })

        if (result.data) {
          return {
            data: normalizeLeaderboardResponse(result.data),
          }
        }

        if (result.error) {
          return {
            error: result.error,
          }
        }

        return {
          data: [],
        }
      },
      providesTags: ['Leaderboard'],
    }),
  }),
})

export const { useAddGameResultMutation, useGetLeaderboardQuery } =
  leaderboardApi
