import { Card, Divider, Space, Typography } from 'antd'
import styles from './TopicDetails.module.css'
import { Topic } from '../../api/forum.schema'
import { CommentsList } from '../CommentsList'
import { CommentComposer } from '../CommentComposer'
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from '../../api/forum.api'
import { useState } from 'react'
import { emojiSet } from '../../pages/Forum/model/mock'

const { Paragraph, Text } = Typography

type TopicDetailsProps = {
  topic: Topic
}

export const TopicDetails = ({ topic }: TopicDetailsProps) => {
  const { data } = useGetCommentsQuery(topic.id)
  const [comment, setComment] = useState<string>('')
  const [createComment, { isLoading }] = useCreateCommentMutation()

  const onEmojiInsert = (emoji: string) => {
    setComment(comment => `${comment}${emoji}`)
  }

  const onSendComment = () => {
    createComment({
      topicId: topic.id,
      text: comment,
    }).then(() => setComment(''))
  }

  return (
    <Card
      className={styles.card}
      title={
        <Space orientation="vertical" size={0} className={styles.header}>
          <Text strong className={styles.title}>
            {topic.title}
          </Text>
          <Text type="secondary" className={styles.meta}>
            {topic.author.displayName}
          </Text>
        </Space>
      }>
      <Paragraph className={styles.content}>{topic.content}</Paragraph>
      <Divider className={styles.divider} />
      <div className={styles.bottom}>
        <CommentsList comments={data?.items} />
        <Divider />
        <CommentComposer
          isDisable={isLoading}
          comment={comment}
          setComment={setComment}
          onSend={onSendComment}
          onEmojiInsert={onEmojiInsert}
          emojiSet={emojiSet}
        />
      </div>
    </Card>
  )
}
