export type Pagination<T> = {
  items: T[]
  limit: number
  offset: number
  total: number
}

export interface User {
  id: number
  firstName: string
  secondName: string
  displayName: string
}

export interface Topic {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  author: User
}

export interface Comment {
  id: number
  text: string
  createdAt: string
  author: User
}

export interface Reply {
  id: number
  text: string
  createdAt: string
  author: User
  children?: Reply[]
}

export interface Reaction {
  id: number
  emoji: string
  user: User
  targetId: number
  targetType: 'comment' | 'reply'
}
