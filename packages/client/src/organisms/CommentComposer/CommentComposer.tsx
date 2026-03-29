import { Button, Input, Popover, Space, Typography } from 'antd'
import { SendOutlined, SmileOutlined } from '@ant-design/icons'
import styles from './CommentComposer.module.css'

const { TextArea } = Input
const { Title } = Typography

type CommentComposerProps = {
  isDisable: boolean
  comment: string
  setComment: (v: string) => void
  onSend: () => void
  onEmojiInsert: (emoji: string) => void
  emojiSet: string[]
}

export const CommentComposer = ({
  isDisable,
  onSend,
  onEmojiInsert,
  emojiSet,
  setComment,
  comment,
}: CommentComposerProps) => {
  return (
    <div className={styles.composer}>
      <Title level={5} className={styles.title}>
        Новый комментарий
      </Title>

      <div className={styles.field}>
        <TextArea
          rows={4}
          placeholder="Напишите комментарий..."
          onChange={e => setComment(e.target.value)}
          value={comment}
          disabled={isDisable}
        />
      </div>

      <Space className={styles.actions}>
        <Popover
          placement="bottomLeft"
          content={
            <Space wrap>
              {emojiSet.map(emoji => (
                <Button
                  key={emoji}
                  disabled={isDisable}
                  size="small"
                  onClick={() => onEmojiInsert(emoji)}>
                  {emoji}
                </Button>
              ))}
            </Space>
          }>
          <Button icon={<SmileOutlined />} disabled={isDisable}>
            Эмодзи
          </Button>
        </Popover>

        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={onSend}
          disabled={isDisable || !comment.trim()}>
          Отправить
        </Button>
      </Space>
    </div>
  )
}
