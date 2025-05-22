export const CreateCommentMessages = {
  text: {
    invalidFormat: 'Текст комментария обязателен и должен быть строкой',
    lengthField: 'Минимальная длина текста — 5 символов, максимальная — 1024',
  },
  offerId: {
    invalidFormat: 'Поле offerId должно содержать корректный идентификатор',
  },
  userId: {
    invalidFormat: 'Поле userId должно содержать корректный идентификатор',
  },
} as const;
