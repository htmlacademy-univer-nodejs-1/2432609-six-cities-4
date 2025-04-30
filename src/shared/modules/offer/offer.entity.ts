import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { City, ApartmentType, Amenity } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public previewPath!: string;

  @prop({ type: () => [String] })
  public imagePaths!: string[];

  @prop({ required: true })
  public date!: Date;

  @prop({ enum: City, required: true })
  public city!: City;

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({ enum: ApartmentType, required: true })
  public apartmentType!: ApartmentType;

  @prop({ required: true })
  public roomCount!: number;

  @prop({ required: true })
  public guestCount!: number;

  @prop({ required: true })
  public cost!: number;

  @prop({ type: () => [String], enum: Amenity })
  public amenity!: Amenity[];

  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({ ref: () => UserEntity, required: true })
  public author!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
