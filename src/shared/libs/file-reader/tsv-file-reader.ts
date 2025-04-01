import {readFileSync} from 'node:fs';

import {FileReader} from './file-reader.interface.js';
import {Offer} from '../../types/offer.js';
import {City} from '../../types/city.js';
import {ApartmentType} from '../../types/apartment.js';
import {Amenity} from '../../types/amenity.js';

export class TsvFileReader implements FileReader{
  private rawData = '';

  constructor(private readonly filename: string) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    if(!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
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
        amenity,
        user,
        commentCount,
        coordinates
      ]) => ({
        title,
        description,
        date: new Date(date),
        city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewPath,
        imagePaths: imagePaths.split(';'),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: Number(rating),
        apartmentType: ApartmentType[apartmentType as 'Apartment' | 'House' | 'Room' | 'Hotel' ],
        roomCount: Number(roomCount),
        guestCount: Number(guestCount),
        cost: Number(cost),
        amenity: amenity as Amenity,
        user,
        commentCount: Number(commentCount),
        coordinates: coordinates.split(';').map(Number) as [number, number]
      }));
  }
}
