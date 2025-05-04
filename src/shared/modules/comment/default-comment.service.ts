import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';

import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { OfferEntity } from '../offer/offer.entity.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,

    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,

    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);

    const aggregation = await this.commentModel.aggregate([
      { $match: { offerId: dto.offerId } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          average: { $avg: '$rating' },
        },
      },
    ]);

    if (aggregation.length > 0) {
      await this.offerModel.findByIdAndUpdate(dto.offerId, {
        commentCount: aggregation[0].count,
        rating: aggregation[0].average,
      });
    }

    this.logger.info(`New comment created: ${comment._id}`);
    return comment.populate('userId');
  }

  public async findByOfferId(
    offerId: string,
    count: number = 50
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .limit(count)
      .sort({ createdAt: -1 })
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();
    return result.deletedCount ?? 0;
  }
}
