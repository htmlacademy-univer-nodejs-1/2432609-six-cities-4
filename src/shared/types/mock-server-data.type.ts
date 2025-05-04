import { City } from './city.js';
import { ApartmentType } from './apartment.js';
import { Amenities } from './amenities.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  images: string[];
  apartmentTypes: ApartmentType[];
  amenities: Amenities[];
  userNames: string[];
  emails: string[];
  avatarImages: string[];
  userTypes: string[];
  coordinates: [number, number][];
};
