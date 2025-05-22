import { Offer, City, ApartmentType, Amenities } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    date,
    city,
    previewPath,
    images,
    isPremium,
    isFavorite,
    rating,
    apartmentType,
    roomCount,
    guestCount,
    cost,
    amenities,
    userName,
    userEmail,
    avatarPath,
    commentCount,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    date: new Date(date),
    city: city as City,
    previewPath,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    apartmentType: apartmentType as ApartmentType,
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    cost: Number(cost),
    amenities: amenities
      .split(';')
      .map((item) => item.trim())
      .filter((item): item is Amenities => item !== '') as Amenities[],
    author: {
      name: userName,
      email: userEmail,
      avatarPath,
      password: 'test123'
    },
    commentCount: Number(commentCount),
    latitude: Number(latitude),
    longitude: Number(longitude),
  };
}
