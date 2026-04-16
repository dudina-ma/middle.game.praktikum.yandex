import { Avatar, Empty, List, Space, Typography } from 'antd'
import styles from './CommentsList.module.css'
import { Comment } from '../../api/forum.schema'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const { Paragraph, Text, Title } = Typography

type CommentsListProps = {
  comments?: Comment[]
}

export const CommentsList = ({ comments }: CommentsListProps) => {
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
          return (
            <List.Item key={comment.id} className={styles.item}>
              <List.Item.Meta
                avatar={
                  <Avatar className={styles.avatar}>
                    {comment.author.displayName}
                  </Avatar>
                }
                title={
                  <Space size={8} wrap>
                    <Text strong>{comment.author.displayName}</Text>
                    <Text type="secondary">
                      {format(new Date(comment.createdAt), 'Pp', {
                        locale: ru,
                      })}
                    </Text>
                  </Space>
                }
                description={<Paragraph>{comment.text}</Paragraph>}
              />
            </List.Item>
          )
        }}
      />
    </div>
  )
}
