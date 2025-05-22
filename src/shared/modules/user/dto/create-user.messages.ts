export const CreateUserMessages = {
  email: {
    invalidFormat: 'Email должен быть корректным адресом электронной почты',
  },
  avatar: {
    invalidFormat: 'Аватар должен быть строкой',
  },
  name: {
    invalidFormat: 'Имя должно быть строкой',
    lengthField: 'Длина имени должна быть от 1 до 15 символов',
  },
  password: {
    invalidFormat: 'Пароль должен быть строкой',
    lengthField: 'Длина пароля должна быть от 6 до 12 символов',
  },
} as const;
