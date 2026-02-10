import type { ReactNode } from 'react'
import { Button, Card, Divider, Space, Tag, Typography } from 'antd'
import { MessageOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Topic } from '../../model/types'
import styles from './TopicDetails.module.css'

const { Paragraph, Text } = Typography

type TopicDetailsProps = {
  topic: Topic
  children?: ReactNode
}

const TopicDetails = ({ topic, children }: TopicDetailsProps) => {
  return (
    <Card
      className={styles.card}
      title={
        <Space direction="vertical" size={0} className={styles.header}>
          <Text strong className={styles.title}>
            {topic.title}
          </Text>
          <Text type="secondary" className={styles.meta}>
            {topic.author} · {topic.date}
          </Text>
          <Space size={4} wrap className={styles.tags}>
            <Tag color="gold">{topic.category}</Tag>
            {topic.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Space>
        </Space>
      }
      extra={
        <Space>
          <Button icon={<MessageOutlined />}>Ответить</Button>
          <Button icon={<ShareAltOutlined />}>Поделиться</Button>
        </Space>
      }>
      <Paragraph className={styles.content}>{topic.content}</Paragraph>
      <Divider className={styles.divider} />
      <div className={styles.bottom}>{children}</div>
    </Card>
  )
}

export default TopicDetails
