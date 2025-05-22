export const UpdateOfferValidationMessage = {
  title: {
    invalidFormat: 'Заголовок должен быть строкой',
    minLength: 'Минимальная длина заголовка — 10 символов',
    maxLength: 'Максимальная длина заголовка — 100 символов',
  },
  description: {
    invalidFormat: 'Описание должно быть строкой',
    minLength: 'Минимальная длина описания — 20 символов',
    maxLength: 'Максимальная длина описания — 1024 символа',
  },
  date: {
    invalidFormat: 'Дата должна быть в формате ISO',
  },
  city: {
    invalid: 'Город должен быть одним из разрешённых значений',
  },
  previewPath: {
    invalidFormat: 'Путь к превью должен быть строкой',
    maxLength: 'Максимальная длина пути к превью — 256 символов',
  },
  images: {
    invalidFormat: 'Изображения должны быть массивом строк',
  },
  rating: {
    invalidFormat: 'Рейтинг должен быть числом',
    min: 'Минимальный рейтинг — 1',
    max: 'Максимальный рейтинг — 5',
  },
  apartmentType: {
    invalid: 'Тип жилья указан неверно',
  },
  roomCount: {
    invalidFormat: 'Количество комнат должно быть целым числом',
    min: 'Минимум комнат — 1',
    max: 'Максимум комнат — 8',
  },
  guestCount: {
    invalidFormat: 'Количество гостей должно быть целым числом',
    min: 'Минимум гостей — 1',
    max: 'Максимум гостей — 10',
  },
  cost: {
    invalidFormat: 'Стоимость должна быть целым числом',
    min: 'Минимальная стоимость — 100',
    max: 'Максимальная стоимость — 100000',
  },
  amenities: {
    invalidFormat: 'Удобства должны быть массивом из разрешённых значений',
  },
  author: {
    invalidFormat: 'Автор должен быть валидным MongoID',
  },
  latitude: {
    invalidFormat: 'Широта должна быть числом',
  },
  longitude: {
    invalidFormat: 'Долгота должна быть числом',
  },
} as const;
