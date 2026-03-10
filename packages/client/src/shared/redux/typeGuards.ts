import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isHttpError(
  error: FetchBaseQueryError
): error is { status: number; data: unknown } {
  return typeof error.status === 'number'
}

export function isFetchError(
  error: FetchBaseQueryError
): error is { status: 'FETCH_ERROR'; error: string } {
  return error.status === 'FETCH_ERROR'
}

export function isParsingError(error: FetchBaseQueryError): error is {
  status: 'PARSING_ERROR'
  originalStatus: number
  data: string
  error: string
} {
  return error.status === 'PARSING_ERROR'
}

export function isTimeoutError(
  error: FetchBaseQueryError
): error is { status: 'TIMEOUT_ERROR'; error: string } {
  return error.status === 'TIMEOUT_ERROR'
}

export function isCustomError(
  error: FetchBaseQueryError
): error is { status: 'CUSTOM_ERROR'; error: string; data?: unknown } {
  return error.status === 'CUSTOM_ERROR'
}

export function isSerializedError(
  error: FetchBaseQueryError | SerializedError | undefined
): error is SerializedError {
  return typeof error === 'object' && error != null && 'message' in error
}
