import type { FormProps } from 'antd'
import { Button, message, Spin } from 'antd'
import { useState } from 'react'
import { AvatarWithControlls } from '../../molecules/AvatarWithControlls/AvatarWithControlls'
import { ProfileForm } from '../../organisms/ProfileForm/ProfileForm'
import { PasswordChangeForm } from '../../organisms/PasswordChangeForm/PasswordChangeForm'
import styles from './Profile.module.css'
import { usePage } from '../../hooks/usePage'
import { PageInitArgs } from '../../routes'
import { User, selectUser } from '../../slices/userSlice'
import { useGetUserQuery } from '../../api/authApi'
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from '../../api/userApi'
import { UpdateProfileRequest } from '../../api/user.schema'
import { getErrorMessage } from '../../utils/errorUtils'

const onFinishFailed: FormProps<User>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

type PasswordChangeFormValues = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const Profile = () => {
  const [isEditData, setIsEditData] = useState(false)
  const [isEditPassword, setIsEditPassword] = useState(false)
  const { data: user, isLoading } = useGetUserQuery()
  const [updateAvatar, { isLoading: isUpdatingAvatar }] =
    useUpdateAvatarMutation()
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation()
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation()

  usePage({ initPage: initProfilePage })

  const onAvatarChange = async (file: File) => {
    try {
      await updateAvatar(file).unwrap()
      message.success('Аватар успешно обновлен')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      message.error(errorMessage)
    }
  }

  const onAvatarDelete = async () => {
    console.log('onAvatarDelete')
  }

  const handleEditData = () => {
    setIsEditData(true)
  }

  const handleCancelEditData = () => {
    setIsEditData(false)
  }

  const handleEditPassword = () => {
    setIsEditPassword(true)
  }

  const handleCancelPasswordChange = () => {
    setIsEditPassword(false)
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
      message.success('Профиль успешно обновлен')
      setIsEditData(false)
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      message.error(errorMessage)
    }
  }

  const onPasswordChangeFinish: FormProps<PasswordChangeFormValues>['onFinish'] =
    (values: PasswordChangeFormValues) => {
      changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
        .unwrap()
        .then(() => {
          message.success('Пароль успешно изменен')
          setIsEditPassword(false)
        })
        .catch(error => {
          const errorMessage = getErrorMessage(error)
          message.error(errorMessage)
        })
    }

  const onPasswordChangeFinishFailed: FormProps<PasswordChangeFormValues>['onFinishFailed'] =
    errorInfo => {
      console.log('Password change failed:', errorInfo)
    }

  if (isLoading || !user) {
    return (
      <div className={styles.container}>
        <Spin size="large" tip="Загрузка..." />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <AvatarWithControlls
        avatarUrl={user.avatar}
        onAvatarChange={onAvatarChange}
        onAvatarDelete={onAvatarDelete}
      />

      {isEditPassword ? (
        <PasswordChangeForm
          onFinish={onPasswordChangeFinish}
          onFinishFailed={onPasswordChangeFinishFailed}
          onCancel={handleCancelPasswordChange}
          isLoading={isChangingPassword}
        />
      ) : (
        <>
          <ProfileForm
            user={user}
            isReadOnly={!isEditData}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onCancel={handleCancelEditData}
            isLoading={isUpdatingProfile}
          />

          {!isEditData && !isEditPassword && (
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
                  onClick={handleEditPassword}>
                  Изменить пароль
                </Button>
              </div>
            </>
          )}
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
