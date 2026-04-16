export interface Topic {
  id: string
  title: string
  author: string
  date: string
  dateValue: number
  category: string
  tags: string[]
  commentsCount: number
  lastActivity: string
  content: string
}

export interface CommentItem {
  id: string
  author: string
  date: string
  content: string
  replyTo?: string
}

export type SegmentValue = 'Все' | 'Популярные' | 'Новые'
export const segmentOptions: SegmentValue[] = ['Все', 'Популярные', 'Новые']
