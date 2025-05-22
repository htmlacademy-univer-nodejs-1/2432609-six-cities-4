import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { City } from '../../../types/city.js';
import { ApartmentType } from '../../../types/apartment.js';
import { Amenities } from '../../../types/amenities.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title!: string;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city!: City;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description!: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.date.invalidFormat })
  public date!: Date;

  @MaxLength(256, { message: CreateOfferValidationMessage.previewPath.maxLength })
  public previewPath!: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @MaxLength(256, { each: true, message: CreateOfferValidationMessage.images.maxLengthEach })
  public images!: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalid })
  public isPremium!: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalid })
  public isFavorite!: boolean;

  @IsNumber({}, { message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  public rating!: number;

  @IsEnum(ApartmentType, { message: CreateOfferValidationMessage.apartmentType.invalid })
  public apartmentType!: ApartmentType;

  @IsInt({ message: CreateOfferValidationMessage.roomCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomCount.maxValue })
  public roomCount!: number;

  @IsInt({ message: CreateOfferValidationMessage.guestCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestCount.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestCount.maxValue })
  public guestCount!: number;

  @IsInt({ message: CreateOfferValidationMessage.cost.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.cost.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.cost.maxValue })
  public cost!: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsEnum(Amenities, { each: true, message: CreateOfferValidationMessage.amenities.invalidValue })
  public amenities!: Amenities[];

  @IsMongoId({ message: CreateOfferValidationMessage.author.invalidId })
  public author!: string;

  @IsNumber({}, { message: CreateOfferValidationMessage.latitude.invalidFormat })
  public latitude!: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.longitude.invalidFormat })
  public longitude!: number;
}
