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
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  UpdateProfileRequest,
} from '../../api/userApi'

const onFinishFailed: FormProps<User>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

export const Profile = () => {
  const [isEditData, setIsEditData] = useState(false)
  const { data: user, isLoading } = useGetUserQuery()
  const [updateAvatar, { isLoading: isUpdatingAvatar }] =
    useUpdateAvatarMutation()
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation()

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

  const handleEditData = () => {
    setIsEditData(true)
  }

  const onFinish: FormProps<User>['onFinish'] = async (values: User) => {
    try {
      const updateData: UpdateProfileRequest = {
        first_name: values.first_name,
        second_name: values.second_name,
        display_name: values.display_name,
        login: values.login,
        email: values.email,
        phone: values.phone,
      }
      await updateProfile(updateData).unwrap()
      setIsEditData(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
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

      <ProfileForm
        user={user}
        isReadOnly={!isEditData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />

      {!isEditData && (
        <>
          <div className={styles.editButtonContainer}>
            <Button type="primary" ghost={true} onClick={handleEditData}>
              Изменить данные
            </Button>
          </div>
          <div className={styles.editButtonContainer}>
            <Button
              type="primary"
              ghost={true}
              onClick={() => console.log('Изменить пароль')}>
              Изменить пароль
            </Button>
          </div>
        </>
      )}
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
