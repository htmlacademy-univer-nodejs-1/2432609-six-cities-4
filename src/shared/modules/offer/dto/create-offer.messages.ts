export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Минимальная длина заголовка — 10 символов',
    maxLength: 'Максимальная длина заголовка — 100 символов',
  },
  description: {
    minLength: 'Минимальная длина описания — 20 символов',
    maxLength: 'Максимальная длина описания — 1024 символа',
  },
  city: {
    invalid: 'Недопустимое значение города',
  },
  date: {
    invalidFormat: 'Дата должна быть в формате ISO',
  },
  previewPath: {
    maxLength: 'Максимальная длина ссылки на превью — 256 символов',
  },
  images: {
    invalidFormat: 'Изображения должны быть массивом строк',
    maxLengthEach: 'Максимальная длина каждой ссылки на изображение — 256 символов',
  },
  isPremium: {
    invalid: 'isPremium должен быть булевым значением',
  },
  isFavorite: {
    invalid: 'isFavorite должен быть булевым значением',
  },
  rating: {
    invalidFormat: 'Рейтинг должен быть числом',
    minValue: 'Минимальный рейтинг — 1',
    maxValue: 'Максимальный рейтинг — 5',
  },
  apartmentType: {
    invalid: 'Неверный тип жилья',
  },
  roomCount: {
    invalidFormat: 'Количество комнат должно быть целым числом',
    minValue: 'Минимальное количество комнат — 1',
    maxValue: 'Максимальное количество комнат — 8',
  },
  guestCount: {
    invalidFormat: 'Количество гостей должно быть целым числом',
    minValue: 'Минимальное количество гостей — 1',
    maxValue: 'Максимальное количество гостей — 10',
  },
  cost: {
    invalidFormat: 'Стоимость должна быть числом',
    minValue: 'Минимальная стоимость — 100',
    maxValue: 'Максимальная стоимость — 100000',
  },
  amenities: {
    invalidFormat: 'Удобства должны быть массивом',
    invalidValue: 'Недопустимое значение удобства',
  },
  author: {
    invalidId: 'Неверный идентификатор автора',
  },
  latitude: {
    invalidFormat: 'Широта должна быть числом',
  },
  longitude: {
    invalidFormat: 'Долгота должна быть числом',
  },
} as const;
