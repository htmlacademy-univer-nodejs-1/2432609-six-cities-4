import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { FavoriteEntity, FavoriteModel } from './favorite.entity.js';
import { FavoriteService } from './favorite-service.interface.js';
import { DefaultFavoriteService } from './default-favorite.service.js';
import { Component } from '../../types/index.js';

export function createFavoriteContainer(): Container {
  const container = new Container();

  container
    .bind<FavoriteService>(Component.FavoriteService)
    .to(DefaultFavoriteService)
    .inSingletonScope();

  container
    .bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel)
    .toConstantValue(FavoriteModel);

  return container;
}
