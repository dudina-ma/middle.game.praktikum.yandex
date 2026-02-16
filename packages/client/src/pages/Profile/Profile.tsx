import type { FormProps } from 'antd'
import { Button, message, Spin } from 'antd'
import { useCallback, useState } from 'react'
import { AvatarWithControls } from '../../molecules/AvatarWithControls/AvatarWithControls'
import { ProfileForm } from '../../organisms/ProfileForm/ProfileForm'
import { PasswordChangeForm } from '../../organisms/PasswordChangeForm/PasswordChangeForm'
import styles from './Profile.module.css'
import { usePage } from '../../hooks/usePage'
import { PageInitArgs } from '../../routes'
import { selectUser, User } from '../../slices/userSlice'
import { useGetUserQuery } from '../../api/authApi'
import {
  useChangePasswordMutation,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
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

type ProfilePageMode = 'showProfileData' | 'editProfileData' | 'changePassword'

export const Profile = () => {
  const [mode, setMode] = useState<ProfilePageMode>('showProfileData')
  const { data: user, isLoading, isUninitialized } = useGetUserQuery()
  const [updateAvatar] = useUpdateAvatarMutation()
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation()
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation()

  usePage({ initPage: initProfilePage })

  const onAvatarChange = useCallback(
    async (file: File) => {
      try {
        await updateAvatar(file).unwrap()
        message.success('Аватар успешно обновлен')
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        message.error(errorMessage)
      }
    },
    [updateAvatar]
  )

  const handleEditData = () => {
    setMode('editProfileData')
  }

  const handleCancelEditData = useCallback(() => {
    setMode('showProfileData')
  }, [])

  const handleEditPassword = () => {
    setMode('changePassword')
  }

  const handleCancelPasswordChange = useCallback(() => {
    setMode('showProfileData')
  }, [])

  const onFinish: FormProps<User>['onFinish'] = useCallback(
    async (values: User) => {
      console.log('user')
      try {
        const updateData: UpdateProfileRequest = {
          first_name: values.first_name,
          second_name: values.second_name,
          display_name: values.display_name,
          login: values.login,
          email: values.email,
          phone: values.phone,
        }

        console.log(updateData)
        await updateProfile(updateData).unwrap()
        message.success('Профиль успешно обновлен')
        setMode('showProfileData')
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        message.error(errorMessage)
      }
    },
    [updateProfile]
  )

  const onPasswordChangeFinish: FormProps<PasswordChangeFormValues>['onFinish'] =
    useCallback(
      async (values: PasswordChangeFormValues) => {
        try {
          await changePassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          }).unwrap()
          message.success('Пароль успешно изменен')
          setMode('showProfileData')
        } catch (error) {
          const errorMessage = getErrorMessage(error)
          message.error(errorMessage)
        }
      },
      [changePassword]
    )

  const onPasswordChangeFinishFailed: FormProps<PasswordChangeFormValues>['onFinishFailed'] =
    useCallback(
      (
        errorInfo: Parameters<
          NonNullable<FormProps<PasswordChangeFormValues>['onFinishFailed']>
        >[0]
      ) => {
        console.log('Password change failed:', errorInfo)
      },
      []
    )

  const isChangePasswordMode = mode === 'changePassword'
  const isShowProfileDataMode = mode === 'showProfileData'

  if (isLoading || isUninitialized) {
    return (
      <div className={styles.container}>
        <Spin size="large" tip="Загрузка..." />
      </div>
    )
  }

  if (!user) {
    throw new Error('Пользователь не найден')
  }

  return (
    <div className={styles.container}>
      <AvatarWithControls
        avatarUrl={user.avatar}
        onAvatarChange={onAvatarChange}
      />

      {isChangePasswordMode ? (
        <PasswordChangeForm
          onFinish={onPasswordChangeFinish}
          onFinishFailed={onPasswordChangeFinishFailed}
          onCancel={handleCancelPasswordChange}
          isLoading={isChangingPassword}
        />
      ) : (
        <ProfileForm
          user={user}
          isReadOnly={isShowProfileDataMode}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onCancel={handleCancelEditData}
          isLoading={isUpdatingProfile}
        />
      )}

      {isShowProfileDataMode && (
        <div className={styles.editButtonContainer}>
          <Button type="primary" ghost={true} onClick={handleEditData}>
            Изменить данные
          </Button>
          <Button type="primary" ghost={true} onClick={handleEditPassword}>
            Изменить пароль
          </Button>
        </div>
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
