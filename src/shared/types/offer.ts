import { Amenities } from './amenities.js';
import { ApartmentType } from './apartment.js';
import { City } from './city.js';
import { User } from './user.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewPath: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  apartmentType: ApartmentType;
  roomCount: number;
  guestCount: number;
  cost: number;
  amenities: Amenities[];
  author: User;
  commentCount: number;
  latitude: number;
  longitude: number;
};
