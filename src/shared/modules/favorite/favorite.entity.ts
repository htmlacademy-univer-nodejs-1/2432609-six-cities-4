import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

@modelOptions({
  schemaOptions: { collection: 'favorites', timestamps: true }
})
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({ ref: () => UserEntity, required: true })
  public userId!: Ref<UserEntity>;

  @prop({ ref: () => OfferEntity, required: true })
  public offerId!: Ref<OfferEntity>;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
