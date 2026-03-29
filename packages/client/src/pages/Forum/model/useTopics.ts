import { useMemo } from 'react'
import { Topic } from '../../../api/forum.schema'

export const useFilterTopics = (filter: string, data?: Topic[]) => {
  const topics: Topic[] = useMemo(
    () =>
      data?.filter(topic =>
        topic.title.toLowerCase().includes(filter.toLowerCase())
      ) || [],
    [data]
  )

  return { topics }
}
