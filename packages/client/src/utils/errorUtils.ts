import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type RTKQueryError =
  | FetchBaseQueryError
  | { status: string | number; data?: unknown; message?: string }

const isJson = (str: string): boolean => {
  const trimmed = str.trim()
  return (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  )
}

const isRTKQueryError = (error: unknown): error is RTKQueryError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('status' in error || 'data' in error)
  )
}

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  )
}

export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return 'Произошла неизвестная ошибка'
  }

  if (isRTKQueryError(error)) {
    const rtkError = error

    if ('data' in rtkError && typeof rtkError.data === 'string') {
      if (isJson(rtkError.data)) {
        try {
          const parsed = JSON.parse(rtkError.data as string) as Record<
            string,
            unknown
          >
          if (typeof parsed.reason === 'string') {
            return parsed.reason
          }
          if (typeof parsed.message === 'string') {
            return parsed.message
          }
          if (typeof parsed.error === 'string') {
            return parsed.error
          }
        } catch {
          return rtkError.data
        }
      }
    }

    if (
      'data' in rtkError &&
      rtkError.data &&
      typeof rtkError.data === 'object'
    ) {
      const data = rtkError.data as Record<string, unknown>

      if (typeof data.reason === 'string') {
        return data.reason
      }
      if (typeof data.message === 'string') {
        return data.message
      }
      if (typeof data.error === 'string') {
        return data.error
      }
      if (typeof data.errors === 'string') {
        return data.errors
      }

      if (Array.isArray(data.errors)) {
        return data.errors.join(', ')
      }
    }

    if ('error' in rtkError && typeof rtkError.error === 'string') {
      return rtkError.error
    }

    if (rtkError.status === 400) {
      return 'Неверный запрос'
    }
    if (rtkError.status === 401) {
      return 'Необходима авторизация'
    }
    if (rtkError.status === 403) {
      return 'Доступ запрещен'
    }
    if (rtkError.status === 404) {
      return 'Ресурс не найден'
    }
    if (rtkError.status === 409) {
      return 'Конфликт данных (например, email уже используется)'
    }
    if (rtkError.status === 500) {
      return 'Внутренняя ошибка сервера'
    }
  }

  if (isErrorWithMessage(error)) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Произошла ошибка при выполнении запроса'
}
