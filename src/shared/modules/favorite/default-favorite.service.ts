import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/index.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async add(userId: string, offerId: string): Promise<void> {
    const exists = await this.favoriteModel.exists({ userId, offerId });
    if (!exists) {
      await this.favoriteModel.create({ userId, offerId });
    }
  }

  public async remove(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ userId, offerId }).exec();
  }

  public async exists(userId: string, offerId: string): Promise<boolean> {
    return (await this.favoriteModel.exists({ userId, offerId })) !== null;
  }
}
