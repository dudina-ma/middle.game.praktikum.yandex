import { Avatar, Button, Empty, List, Space, Typography } from 'antd'
import { CommentItem } from '../../../model/types'
import styles from './CommentsList.module.css'

const { Paragraph, Text, Title } = Typography

type CommentsListProps = {
  comments: CommentItem[]
  replyToId: string | null
  onReply: (id: string | null) => void
}

const CommentsList = ({ comments, replyToId, onReply }: CommentsListProps) => {
  const emptyContent = (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Комментариев пока нет — будь первым!"
      className={styles.empty}
    />
  )

  return (
    <div className={styles.wrapper}>
      <Title level={4} className={styles.title}>
        Комментарии
      </Title>
      <List
        className={styles.list}
        dataSource={comments}
        locale={{ emptyText: emptyContent }}
        renderItem={comment => {
          const isReply = Boolean(comment.replyTo)
          const isReplyTarget = replyToId === comment.id

          return (
            <List.Item
              key={comment.id}
              className={`${styles.item} ${isReply ? styles.itemReply : ''} ${
                isReplyTarget ? styles.itemTarget : ''
              }`}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className={isReply ? styles.avatarReply : styles.avatar}>
                    {comment.author.slice(0, 1)}
                  </Avatar>
                }
                title={
                  <Space size={8} wrap>
                    <Text strong>{comment.author}</Text>
                    <Text type="secondary">{comment.date}</Text>
                  </Space>
                }
                description={<Paragraph>{comment.content}</Paragraph>}
              />
              <Space direction="vertical" align="end">
                <span className={styles.actionPlaceholder} aria-hidden />
                <Button
                  type="text"
                  onClick={() => onReply(isReplyTarget ? null : comment.id)}>
                  Ответить
                </Button>
              </Space>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default CommentsList
