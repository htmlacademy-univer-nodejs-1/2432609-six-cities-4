import { inject, injectable } from 'inversify';
import { Response, NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';

import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { LoginUserRequest } from './login-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuth
    });

    this.addRoute({
      path: '/logout',
      method: HttpMethod.Post,
      handler: this.logout
    });
    this.logger.info('UserController routes registered');
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const existsUser = await this.userService.findByEmail(body.email);

      if (existsUser) {
        throw new HttpError(
          StatusCodes.CONFLICT,
          `User with email «${body.email}» exists.`,
          'UserController'
        );
      }

      const newUser = await this.userService.create(
        body,
        this.configService.get('SALT')
      );

      this.created(res, fillDTO(UserRdo, newUser));
    } catch (error) {
      return next(error);
    }
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const existsUser = await this.userService.findByEmail(body.email);

      if (!existsUser) {
        throw new HttpError(
          StatusCodes.UNAUTHORIZED,
          `User with email ${body.email} not found.`,
          'UserController'
        );
      }

      this.ok(res, fillDTO(UserRdo, existsUser));
    } catch (error) {
      return next(error);
    }
  }

  public async checkAuth(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // заглушка, тут будет jwt
      const mockUser = await this.userService.findByEmail('torans@overlook.net');

      if (!mockUser) {
        throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'UserController');
      }

      this.ok(res, fillDTO(UserRdo, mockUser));
    } catch (error) {
      return next(error);
    }
  }


  public async logout(_req: Request, res: Response): Promise<void> {
    this.noContent(res, {});
  }

}
