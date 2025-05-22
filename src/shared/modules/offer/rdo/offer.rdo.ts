import { Expose } from 'class-transformer';
import { City } from '../../../types/city.js';
import { ApartmentType } from '../../../types/apartment.js';
import { Amenities } from '../../../types/amenities.js';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewPath!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public apartmentType!: ApartmentType;

  @Expose()
  public roomCount!: number;

  @Expose()
  public guestCount!: number;

  @Expose()
  public cost!: number;

  @Expose()
  public amenities!: Amenities[];

  @Expose()
  public author!: string;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
