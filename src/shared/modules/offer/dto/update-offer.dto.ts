import { City } from '../../../types/city.js';
import { ApartmentType } from '../../../types/apartment.js';
import { Amenities } from '../../../types/amenities.js';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.description.invalidFormat })
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UpdateOfferValidationMessage.date.invalidFormat })
  public date?: Date;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.previewPath.invalidFormat })
  @MaxLength(256, { message: UpdateOfferValidationMessage.previewPath.maxLength })
  public previewPath?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.images.invalidFormat })
  @IsString({ each: true, message: UpdateOfferValidationMessage.images.invalidFormat })
  public images?: string[];

  @IsOptional()
  public isPremium?: boolean;

  @IsOptional()
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.rating.min })
  @Max(5, { message: UpdateOfferValidationMessage.rating.max })
  public rating?: number;

  @IsOptional()
  @IsEnum(ApartmentType, { message: UpdateOfferValidationMessage.apartmentType.invalid })
  public apartmentType?: ApartmentType;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.roomCount.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.roomCount.min })
  @Max(8, { message: UpdateOfferValidationMessage.roomCount.max })
  public roomCount?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.guestCount.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.guestCount.min })
  @Max(10, { message: UpdateOfferValidationMessage.guestCount.max })
  public guestCount?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.cost.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.cost.min })
  @Max(100000, { message: UpdateOfferValidationMessage.cost.max })
  public cost?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.amenities.invalidFormat })
  @IsEnum(Amenities, { each: true, message: UpdateOfferValidationMessage.amenities.invalidFormat })
  public amenities?: Amenities[];

  @IsOptional()
  @IsMongoId({ message: UpdateOfferValidationMessage.author.invalidFormat })
  public author?: string;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.latitude.invalidFormat })
  public latitude?: number;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.longitude.invalidFormat })
  public longitude?: number;
}
