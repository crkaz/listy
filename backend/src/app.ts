import { ListsRoutes } from './services/lists/routes';
import { createContainer } from './container';
import { errorHandler } from './middleware/error-handler';
import express from 'express';
import helmet from 'helmet';
import { logger } from './middleware/logger';
import { notFound } from './middleware/not-found';
import { swaggerSpec } from './docs/swagger';
import swaggerUI from 'swagger-ui-express';

export class App {
  readonly server;
  readonly container;
  private readonly router;

  constructor(useTestDb: boolean = false) {
    this.server = express();
    this.router = express.Router();
    this.container = createContainer(this.router, useTestDb);

    this.setHeaders();
    this.registerMiddleware();
    this.registerRoutes();
    this.registerFallbacks();
  }

  setHeaders(): void {
    this.server.disable('x-powered-by');
  }

  registerMiddleware(): void {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(logger);
  }

  registerRoutes(): void {
    // Service routes (this.router) are registered in container.ts via DI.
    this.server.use('/api', this.router);
    this.server.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  }

  registerFallbacks(): void {
    this.server.use(notFound);
    this.server.use(errorHandler);
  }
}
