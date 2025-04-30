import { Amenity } from './amenity.js';
import { ApartmentType } from './apartment.js';
import { City } from './city.js';
import { User } from './user.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewPath: string;
  imagePaths: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  apartmentType: ApartmentType;
  roomCount: number;
  guestCount: number;
  cost: number;
  amenity: Amenity[];
  author: User;
  commentCount: number;
  latitude: number;
  longitude: number;
};
