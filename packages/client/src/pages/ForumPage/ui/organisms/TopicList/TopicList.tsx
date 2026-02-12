import { Badge, Card, List, Space, Tag, Typography } from 'antd'
import { Topic } from '../../../model/types'
import styles from './TopicList.module.css'

const { Text } = Typography

type TopicListProps = {
  topics: Topic[]
  selectedTopicId: string
  onSelectTopic: (id: string) => void
}

const TopicList = ({
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
              onClick={() => onSelectTopic(topic.id)}
              className={`${styles.item} ${
                isSelected ? styles.itemSelected : ''
              }`}>
              <div className={styles.itemContent}>
                <Space align="start" className={styles.itemHeader}>
                  <div>
                    <Text strong className={styles.title}>
                      {topic.title}
                    </Text>
                    <div className={styles.meta}>
                      <Text type="secondary">
                        {topic.author} · {topic.date}
                      </Text>
                    </div>
                  </div>
                  <Badge count={topic.commentsCount} />
                </Space>
                <Space size={4} wrap className={styles.tags}>
                  <Tag color="gold">{topic.category}</Tag>
                  {topic.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
                <div className={styles.activity}>
                  <Text type="secondary">
                    Последняя активность: {topic.lastActivity}
                  </Text>
                </div>
              </div>
            </List.Item>
          )
        }}
      />
    </Card>
  )
}

export default TopicList
