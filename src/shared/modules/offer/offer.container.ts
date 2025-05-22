import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferModel, OfferEntity } from './offer.entity.js';
import { Component } from '../../types/index.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferService } from './offer-service.interface.js';
import { OfferController } from './offer.controller.js';

export function createOfferContainer(): Container {
  const offerContainer = new Container();

  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  offerContainer
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService)
    .inSingletonScope();

  offerContainer
    .bind<OfferController>(Component.OfferController)
    .to(OfferController)
    .inSingletonScope();

  return offerContainer;
}
