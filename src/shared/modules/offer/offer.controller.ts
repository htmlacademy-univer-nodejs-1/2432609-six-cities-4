import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import {
  BaseController,
  HttpError,
  HttpMethod,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:city/premium', method: HttpMethod.Get, handler: this.getPremium });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/:offerId/favorite', method: HttpMethod.Post, handler: this.addFavorite });
    this.addRoute({ path: '/:offerId/favorite', method: HttpMethod.Delete, handler: this.removeFavorite });
  }

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const count = req.query.limit ? Number(req.query.limit) : 60;
      const userId = req.body?.userId; // или req.user?.id если есть auth middleware
      const offers = await this.offerService.findAll(count, userId);
      this.ok(res, fillDTO(OfferRdo, offers));
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body as CreateOfferDto;
      const result = await this.offerService.create(dto);
      this.created(res, fillDTO(OfferRdo, result));
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const offer = await this.offerService.findById(req.params.offerId, req.body?.userId);
      if (!offer) {
        throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', 'OfferController');
      }
      this.ok(res, fillDTO(OfferRdo, offer));
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body as UpdateOfferDto;
      const updatedOffer = await this.offerService.updateById(req.params.offerId, dto);
      if (!updatedOffer) {
        throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found or not authorized', 'OfferController');
      }
      this.ok(res, fillDTO(OfferRdo, updatedOffer));
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.offerService.deleteById(req.params.offerId);
      if (!result) {
        throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found or not authorized', 'OfferController');
      }
      this.noContent(res, {});
    } catch (error) {
      next(error);
    }
  }

  public async getPremium(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const city = req.params.city as City;
      const userId = req.body?.userId;
      const offers = await this.offerService.findPremiumOffersByCity(city, userId);
      this.ok(res, fillDTO(OfferRdo, offers));
    } catch (error) {
      next(error);
    }
  }

  public async getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.body?.userId;
      if (!userId) {
        throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only authenticated users can access favorites.');
      }
      const favorites = await this.offerService.getUserFavorites(userId);
      this.ok(res, fillDTO(OfferRdo, favorites));
    } catch (error) {
      next(error);
    }
  }

  public async addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.body?.userId;
      const { offerId } = req.params;
      if (!userId) {
        throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only authenticated users can add favorites.');
      }
      const updated = await this.offerService.addFavorite(userId, offerId);
      this.ok(res, fillDTO(OfferRdo, updated));
    } catch (error) {
      next(error);
    }
  }

  public async removeFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.body?.userId;
      const { offerId } = req.params;
      if (!userId) {
        throw new HttpError(StatusCodes.UNAUTHORIZED, 'Only authenticated users can remove favorites.');
      }
      await this.offerService.deleteFavorite(userId, offerId);
      this.noContent(res, {});
    } catch (error) {
      next(error);
    }
  }
}
