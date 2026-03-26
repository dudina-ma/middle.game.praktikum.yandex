import type { Request } from 'express'
import type { AuthUser } from './auth'

export type AuthedRequest = Request & { user?: AuthUser }
