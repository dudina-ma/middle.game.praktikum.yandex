import { Rule } from 'antd/es/form'

export const nameRules: Rule[] = [
  {
    required: true,
    message: 'Введите имя',
  },
  {
    pattern: /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/,
    message:
      'Первая буква заглавная, только латиница или кириллица, допускается дефис',
  },
]

export const loginRules: Rule[] = [
  {
    required: true,
    message: 'Введите логин',
  },
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
]

export const emailRules: Rule[] = [
  {
    required: true,
    message: 'Введите email',
  },
  {
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    message: 'Введите корректный email',
  },
]

export const passwordRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста, введите пароль!',
  },
  {
    pattern: /^(?=.*[A-Z])(?=.*\d).*/,
    message: 'Пароль должен содержать заглавную букву и цифру',
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

export const phoneRules: Rule[] = [
  {
    required: true,
    message: 'Введите номер телефона',
  },
  {
    pattern: /^\+?\d{10,15}$/,
    message: 'Введите корректный номер телефона',
  },
]
