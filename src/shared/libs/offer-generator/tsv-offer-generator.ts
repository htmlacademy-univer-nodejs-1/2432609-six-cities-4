import dayjs from 'dayjs';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { OfferGenerator } from './offer-generator.interface.js';

const PRICE_RANGE = {
  MIN: 100,
  MAX: 100_000,
};

const ROOM_COUNT_RANGE = {
  MIN: 1,
  MAX: 8,
};

const GUEST_COUNT_RANGE = {
  MIN: 1,
  MAX: 10,
};

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  private generateRandomDate(): string {
    return dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
  }

  private generateRandomBoolean(): string {
    return Boolean(generateRandomValue(0, 1)).toString();
  }

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const date = this.generateRandomDate();
    const city = getRandomItem(this.mockData.cities);
    const previewPath = getRandomItem(this.mockData.previewImages);
    const imagePaths = getRandomItems(this.mockData.images).join(';');
    const isPremium = this.generateRandomBoolean();
    const isFavorite = this.generateRandomBoolean();
    const rating = generateRandomValue(1, 5, 1); // 1 знак после запятой
    const apartmentType = getRandomItem(this.mockData.apartmentTypes);
    const roomCount = generateRandomValue(ROOM_COUNT_RANGE.MIN, ROOM_COUNT_RANGE.MAX);
    const guestCount = generateRandomValue(GUEST_COUNT_RANGE.MIN, GUEST_COUNT_RANGE.MAX);
    const cost = generateRandomValue(PRICE_RANGE.MIN, PRICE_RANGE.MAX);
    const amenities = getRandomItems(this.mockData.amenities).join(';');
    const userName = getRandomItem(this.mockData.userNames);
    const commentCount = 0;
    const coordinates = getRandomItem(this.mockData.coordinates).join(';');

    return [
      title,
      description,
      date,
      city,
      previewPath,
      imagePaths,
      isPremium,
      isFavorite,
      rating,
      apartmentType,
      roomCount,
      guestCount,
      cost,
      amenities,
      userName,
      commentCount,
      coordinates
    ].join('\t');
  }
}
