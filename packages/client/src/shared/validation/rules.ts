import { Rule } from 'antd/es/form'

export const getRequiredRule: (message: string) => Rule = message => ({
  required: true,
  message,
})

export const firstNameRules: Rule[] = [
  {
    pattern: /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/,
    message:
      'Имя должно начинаться с заглавной буквы, содержать только буквы и дефис (не в начале/конце)',
  },
  getRequiredRule('Имя обязательно для заполнения'),
]

export const secondNameRules: Rule[] = [
  {
    pattern: /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/,
    message:
      'Имя должно начинаться с заглавной буквы, содержать только буквы и дефис (не в начале/конце)',
  },
  getRequiredRule('Фамилия обязательно для заполнения'),
]

export const loginRules: Rule[] = [
  {
    pattern: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/,
    message:
      'Логин только латиница, может содержать цифры, дефис и нижнее подчёркивание',
  },
  {
    min: 3,
    message: 'Логин должен быть минимум 3 символов',
  },
  {
    max: 20,
    message: 'Логин должен быть максимум 20 символов',
  },
  getRequiredRule('Логин обязателен для заполнения'),
]

export const displayNameRules: Rule[] = [
  {
    pattern: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/,
    message:
      'Никнейм может содержать только латинские буквы, цифры, дефис и подчёркивание, и должен содержать хотя бы одну букву',
  },
  {
    min: 3,
    message: 'Никнейм должен быть минимум 3 символов',
  },
  {
    max: 20,
    message: 'Никнейм должен быть максимум 20 символов',
  },
  getRequiredRule('Никнейм обязателен для заполнения'),
]

export const emailRules: Rule[] = [
  {
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    message:
      'Email должен быть в формате example@mail.com, после точки должны быть латинские буквы',
  },
  getRequiredRule('Email обязателен для заполнения'),
]

export const newPasswordNonMatchRule: Rule = ({ getFieldValue }) => ({
  message: 'Новый пароль должен отличаться от старого',
  validator: async (_: unknown, newPassword: string) => {
    if (getFieldValue('oldPassword') == newPassword) {
      throw new Error()
    }
  },
})

export const confirmPasswordMatchRule: Rule = ({ getFieldValue }) => ({
  message: 'Пароли не совпадают',
  validator: async (_: unknown, confirmPassword: string) => {
    if (getFieldValue('newPassword') !== confirmPassword) {
      throw new Error()
    }
  },
})

export const passwordRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста, введите пароль!',
  },
  {
    pattern: /^(?=.*[A-Z])(?=.*\d).*/,
    message: 'Пароль должен содержать хотя бы одну заглавную букву и цифру',
  },
  {
    min: 8,
    message: 'Пароль должен быть минимум 8 символов',
  },
  {
    max: 40,
    message: 'Пароль должен быть максимум 40 символов',
  },
]

export const oldPasswordRules: Rule[] = [
  getRequiredRule('Старый пароль обязателен для заполнения'),
]

export const confirmPasswordRules: Rule[] = [
  ...passwordRules,
  confirmPasswordMatchRule,
]

export const newPasswordRules: Rule[] = [
  ...passwordRules,
  newPasswordNonMatchRule,
]

export const correctPhoneRule: Rule = () => ({
  message: 'Телефон должен быть от 10 до 15 цифр и может начинаться с +',
  validator: async (_: unknown, value: string) => {
    if (!value) {
      return
    }

    const normalized = value.replace(/[^\d+]/g, '')
    const phoneRegex = /^\+?\d{10,15}$/

    if (!phoneRegex.test(normalized)) {
      throw new Error()
    }
  },
})

export const phoneRules: Rule[] = [
  getRequiredRule('Введите номер телефона'),
  correctPhoneRule,
]
