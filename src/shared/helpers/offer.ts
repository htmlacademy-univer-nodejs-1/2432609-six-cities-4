import { Offer, City, ApartmentType, Amenity } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
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
    imagePaths: imagePaths.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    apartmentType: apartmentType as ApartmentType,
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    cost: Number(cost),
    amenity: amenities
      .split(';')
      .map((item) => item.trim())
      .filter((item): item is Amenity => item !== '') as Amenity[],
    author: {
      name: userName,
      email: userEmail,
      avatarPath,
    },
    commentCount: Number(commentCount),
    latitude: Number(latitude),
    longitude: Number(longitude),
  };
}
