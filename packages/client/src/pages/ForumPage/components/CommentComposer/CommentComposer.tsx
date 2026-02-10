import { Button, Card, Input, Popover, Space, Typography } from 'antd'
import { SendOutlined, SmileOutlined } from '@ant-design/icons'
import { CommentItem } from '../../model/types'
import styles from './CommentComposer.module.css'

const { TextArea } = Input
const { Text, Title } = Typography

type CommentComposerProps = {
  newComment: string
  onChange: (value: string) => void
  onSend: () => void
  onEmojiInsert: (emoji: string) => void
  emojiSet: string[]
  replyToComment: CommentItem | null
  onCancelReply: () => void
}

const CommentComposer = ({
  newComment,
  onChange,
  onSend,
  onEmojiInsert,
  emojiSet,
  replyToComment,
  onCancelReply,
}: CommentComposerProps) => {
  return (
    <div className={styles.composer}>
      <Title level={5} className={styles.title}>
        Новый комментарий
      </Title>
      <div className={styles.replyContainer}>
        {replyToComment && (
          <Card size="small" className={styles.replyCard}>
            <Space className={styles.replyRow}>
              <Text>Ответ пользователю: {replyToComment.author}</Text>
              <Button size="small" onClick={onCancelReply}>
                Отменить
              </Button>
            </Space>
          </Card>
        )}
      </div>
      <TextArea
        rows={3}
        placeholder="Напишите комментарий..."
        value={newComment}
        onChange={event => onChange(event.target.value)}
      />
      <Space className={styles.actions}>
        <Popover
          placement="bottomLeft"
          content={
            <Space wrap>
              {emojiSet.map(emoji => (
                <Button
                  key={emoji}
                  size="small"
                  onClick={() => onEmojiInsert(emoji)}>
                  {emoji}
                </Button>
              ))}
            </Space>
          }>
          <Button icon={<SmileOutlined />}>Эмодзи</Button>
        </Popover>
        <Button
          type="primary"
          icon={<SendOutlined />}
          disabled={!newComment.trim()}
          onClick={onSend}>
          Отправить
        </Button>
      </Space>
    </div>
  )
}

export default CommentComposer
