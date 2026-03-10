import { memo } from 'react'
import type { UploadProps } from 'antd'
import { Avatar, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styles from './AvatarWithControls.module.css'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
]

type AvatarWithControlsProps = {
  avatarUrl?: string
  onAvatarChange?: (file: File) => void
}

export const AvatarWithControls = memo(
  ({ avatarUrl, onAvatarChange }: AvatarWithControlsProps) => {
    const handleChange: UploadProps['onChange'] = info => {
      const { file } = info
      const fileToUse = file instanceof File ? file : file.originFileObj

      if (!fileToUse) {
        return
      }

      if (fileToUse.size > MAX_SIZE) {
        return
      }

      if (!ALLOWED_TYPES.includes(fileToUse.type)) {
        return
      }

      onAvatarChange?.(fileToUse)
    }

    return (
      <div className={styles.container}>
        <Avatar size={100} src={avatarUrl}>
          {!avatarUrl && 'Нет аватара'}
        </Avatar>
        <div className={styles.actions}>
          <Upload
            beforeUpload={() => false}
            showUploadList={false}
            onChange={handleChange}
            accept="image/*">
            <Button
              type="text"
              icon={<UploadOutlined />}
              className={styles.iconButton}
            />
          </Upload>
        </div>
      </div>
    )
  }
)
