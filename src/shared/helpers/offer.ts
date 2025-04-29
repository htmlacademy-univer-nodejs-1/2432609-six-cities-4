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
    userEmail,
    commentCount,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title: title,
    description: description,
    date: new Date(date),
    city: city as City,
    previewPath: previewPath,
    imagePaths: imagePaths.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    apartmentType: apartmentType as ApartmentType,
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    cost: Number(cost),
    amenity: amenities.split(';') as Amenity[],
    user: userEmail,
    commentCount: Number(commentCount),
    coordinates: coordinates.split(';').map(Number) as [number, number],
  };
}
