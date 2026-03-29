import { Card, Flex, List, Space, Typography } from 'antd'
import styles from './TopicList.module.css'
import { Topic } from '../../api/forum.schema'
import { formatDistance, subDays } from 'date-fns'
import { ru } from 'date-fns/locale'

const { Text } = Typography

const getFormatDate = (date: string) => {
  return formatDistance(subDays(new Date(), 3), new Date(date), {
    addSuffix: true,
    locale: ru,
  })
}

type TopicListProps = {
  topics: Topic[]
  selectedTopicId?: number
  onSelectTopic: (topic: Topic) => void
}

export const TopicList = ({
  topics,
  selectedTopicId,
  onSelectTopic,
}: TopicListProps) => {
  return (
    <Card title="Темы" className={styles.card}>
      <List
        className={styles.list}
        dataSource={topics}
        locale={{ emptyText: 'Темы не найдены' }}
        renderItem={topic => {
          const isSelected = topic.id === selectedTopicId
          return (
            <List.Item
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className={`${styles.item} ${
                isSelected ? styles.itemSelected : ''
              }`}>
              <Space.Compact className={styles.itemContent} vertical>
                <Flex justify="space-between">
                  <Text strong className={styles.title}>
                    {topic.title}
                  </Text>
                  <Text type="secondary">{getFormatDate(topic.updatedAt)}</Text>
                </Flex>
                <Text type="secondary">Автор: {topic.author.displayName}</Text>
              </Space.Compact>
            </List.Item>
          )
        }}
      />
    </Card>
  )
}
