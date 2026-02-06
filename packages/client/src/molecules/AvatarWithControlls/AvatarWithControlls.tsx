import { memo } from 'react'
import { Avatar, Button, Upload } from 'antd'
import type { UploadProps } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './AvatarWithControlls.module.css'

type AvatarWithControllsProps = {
  avatarUrl?: string
  onAvatarChange?: (file: File) => void
  onAvatarDelete?: () => void
}

export const AvatarWithControlls = memo(
  ({ avatarUrl, onAvatarChange, onAvatarDelete }: AvatarWithControllsProps) => {
    const handleChange: UploadProps['onChange'] = info => {
      const { file } = info
      const fileToUse = file instanceof File ? file : file.originFileObj

      if (fileToUse) {
        onAvatarChange?.(fileToUse)
      }
    }

    const isAllowDelete = avatarUrl && onAvatarDelete

    return (
      <div className={styles.container}>
        <Avatar size={100} src={avatarUrl} />
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
          {isAllowDelete && (
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={onAvatarDelete}
              className={styles.iconButton}
              danger
            />
          )}
        </div>
      </div>
    )
  }
)
