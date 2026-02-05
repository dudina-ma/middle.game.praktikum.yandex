import type { FormProps } from 'antd'
import { Button } from 'antd'
import { useState } from 'react'
import { AvatarWithControlls } from '../../molecules/AvatarWithControlls/AvatarWithControlls'
import { ProfileForm } from '../../organisms/ProfileForm/ProfileForm'
import styles from './Profile.module.css'
import { usePage } from '../../hooks/usePage'
import { PageInitArgs } from '../../routes'
import { User, selectUser } from '../../slices/userSlice'
import { useGetUserQuery } from '../../api/authApi'
import { useUpdateAvatarMutation } from '../../api/userApi'

const onFinish: FormProps<User>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<User>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

export const Profile = () => {
  const [isReadOnly, setIsReadOnly] = useState(true)
  const { data: user, isLoading } = useGetUserQuery()
  const [updateAvatar, { isLoading: isUpdatingAvatar }] =
    useUpdateAvatarMutation()

  usePage({ initPage: initProfilePage })

  const onAvatarChange = async (file: File) => {
    try {
      await updateAvatar(file).unwrap()
    } catch (error) {
      console.error('Failed to update avatar:', error)
    }
  }

  const onAvatarDelete = async () => {
    console.log('onAvatarDelete')
  }

  if (isLoading || !user) {
    return null
  }

  return (
    <div className={styles.container}>
      <AvatarWithControlls
        avatarUrl={user.avatar}
        onAvatarChange={onAvatarChange}
        onAvatarDelete={onAvatarDelete}
      />

      <div className={styles.editButtonContainer}>
        <Button
          type="primary"
          ghost={true}
          onClick={() => setIsReadOnly(false)}>
          Редактировать
        </Button>
      </div>

      <ProfileForm
        user={user}
        isReadOnly={isReadOnly}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </div>
  )
}

export const initProfilePage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    const { authApi } = await import('../../api/authApi')
    dispatch(authApi.endpoints.getUser.initiate())
  }

  return Promise.resolve()
}
