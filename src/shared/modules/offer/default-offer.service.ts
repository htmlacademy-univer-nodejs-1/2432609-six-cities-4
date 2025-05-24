import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { City } from '../../types/index.js';
import { Component } from '../../types/index.js';
import { FavoriteEntity } from '../favorite/favorite.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.FavoriteModel)
    private readonly favoriteModel: types.ModelType<FavoriteEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    return this.offerModel.create(dto);
  }

  public async findAll(count = 60, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel.find().limit(count).exec();
    return this.getWithFavorites(offers, userId);
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId).exec();
    if (!offer) {
      return null;
    }
    return this.getOneWithFavorite(offer, userId);
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(
      offerId,
      { $inc: { commentCount: 1 } },
      { new: true }
    ).exec();
  }

  public async findPremiumOffersByCity(city: City, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel.find({ city, isPremium: true }).limit(3).exec();
    return this.getWithFavorites(offers, userId);
  }

  public async getUserFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const favorites = await this.favoriteModel.find({ userId }).exec();
    const offerIds = favorites.map((favorite) => favorite.offerId);
    const offers = await this.offerModel.find({ _id: { $in: offerIds } }).exec();
    return this.getWithFavorites(offers, userId);
  }

  public async addFavorite(userId: string, offerId: string): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.findById(offerId).exec();
    if (!offer) {
      throw new Error(`Offer with id ${offerId} not found`);
    }

    const existing = await this.favoriteModel.findOne({ userId, offerId }).exec();
    if (!existing) {
      await this.favoriteModel.create({ userId, offerId });
    }

    offer.isFavorite = true;
    return offer;
  }

  public async deleteFavorite(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ userId, offerId }).exec();
  }

  private async getWithFavorites(
    offers: DocumentType<OfferEntity>[],
    userId?: string
  ): Promise<DocumentType<OfferEntity>[]> {
    if (!userId) {
      return offers.map((offer) => {
        offer.isFavorite = false;
        return offer;
      });
    }

    const favorites = await this.favoriteModel.find({ userId }).lean().exec();
    const favoriteIds = new Set(favorites.map((f) => f.offerId.toString()));

    return offers.map((offer) => {
      offer.isFavorite = favoriteIds.has(offer._id.toString());
      return offer;
    });
  }

  private async getOneWithFavorite(
    offer: DocumentType<OfferEntity>,
    userId?: string
  ): Promise<DocumentType<OfferEntity>> {
    if (!userId) {
      offer.isFavorite = false;
      return offer;
    }

    const isFavorite = await this.favoriteModel.findOne({ userId, offerId: offer.id }).exec();
    offer.isFavorite = Boolean(isFavorite);

    return offer;
  }
}
