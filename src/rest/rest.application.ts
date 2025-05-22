import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { Controller, ExceptionFilter } from '../shared/libs/rest/index.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.UserController) private readonly userController: Controller,
    // @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter
  ) {
    this.server = express();
  }

  private async initDb(): Promise<void> {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    await this.databaseClient.connect(mongoUri);
  }

  private async initServer(): Promise<void> {
    const port = this.config.get('PORT');
    this.server.listen(port, () => {
      this.logger.info(`Server started on http://localhost:${port}`);
    });
  }

  private async initMiddleware(): Promise<void> {
    this.server.use(express.json());
  }

  private async initControllers(): Promise<void> {
    this.server.use('/users', this.userController.router);
    // this.server.use('/offers', this.offerController.router);
  }

  private async initExceptionFilters(): Promise<void> {
    this.server.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.logger.info('Application initialization started');

    this.logger.info('Connecting to MongoDB');
    await this.initDb();
    this.logger.info('Database connection established');

    this.logger.info('Registering middleware');
    await this.initMiddleware();
    this.logger.info('Middleware initialized');

    this.logger.info('Registering controllers');
    await this.initControllers();
    this.logger.info('Controllers initialized');

    this.logger.info('Registering exception filter');
    await this.initExceptionFilters();
    this.logger.info('Exception filter registered');

    this.logger.info('Starting server');
    await this.initServer();
  }
}
