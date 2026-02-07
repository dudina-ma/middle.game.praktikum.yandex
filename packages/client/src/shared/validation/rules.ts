export const nameRules = [
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

export const loginRules = [
  {
    required: true,
    message: 'Введите логин',
  },
  {
    pattern: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
    message: 'От 3 до 20 символов, латиница, цифры допустимы, но не только они',
  },
]

export const emailRules = [
  {
    required: true,
    message: 'Введите email',
  },
  {
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    message: 'Введите корректный email',
  },
]

export const passwordRules = [
  {
    required: true,
    message: 'Пожалуйста, введите пароль!',
  },
  {
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    message: 'Пароль должен содержать заглавную букву и цифру',
  },
]

export const phoneRules = [
  {
    required: true,
    message: 'Введите номер телефона',
  },
  {
    pattern: /^\+?\d{10,15}$/,
    message: 'Введите корректный номер телефона',
  },
]
