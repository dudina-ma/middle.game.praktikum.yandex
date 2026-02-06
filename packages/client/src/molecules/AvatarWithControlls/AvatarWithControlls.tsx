import { memo } from 'react'
import { Avatar, Button, Upload } from 'antd'
import type { UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styles from './AvatarWithControlls.module.css'

type AvatarWithControllsProps = {
  avatarUrl?: string
  onAvatarChange?: (file: File) => void
}

export const AvatarWithControlls = memo(
  ({ avatarUrl, onAvatarChange }: AvatarWithControllsProps) => {
    const handleChange: UploadProps['onChange'] = info => {
      const { file } = info
      const fileToUse = file instanceof File ? file : file.originFileObj

      if (fileToUse) {
        onAvatarChange?.(fileToUse)
      }
    }

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
        </div>
      </div>
    )
  }
)
