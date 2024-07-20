import express, { RequestHandler, Router } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

import { PORT } from 'src/config';
import { errorHandler } from 'src/controllers/middlewares/handle-error-code';
import passport from 'src/passport';

import { init } from 'src/init';
import { DataSource } from 'typeorm';

export interface Application {
    app: express.Application;
    dataSource: DataSource;
}
interface Controller {
    getRouter(): Router;
}

interface Route {
    path: string;
    controller: Controller;
}

const prefixRoutes = (routes: Route[]): Router => {
    const router = Router();

    routes.forEach((route) => {
        router.use(route.path, route.controller.getRouter());
    });

    return router;
};

/**
 * Main function to setup Express application here
 */
export async function createApp(): Promise<Application> {
    const app = express();
    app.set('port', PORT);
    app.use(helmet() as RequestHandler);
    app.use(compression());
    app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }) as RequestHandler);
    app.use(passport.initialize());
    app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);

    const { dataSource, healthcheckController, productController, transactionController, authController } =
        await init();
    const routes: Route[] = [
        { path: '/healthcheck', controller: healthcheckController },
        { path: '/api/v1/products', controller: productController },
        { path: '/api/v1/transactions', controller: transactionController },
        { path: '/api/v1/auth', controller: authController }
    ];

    app.use('/', prefixRoutes(routes));
    // In order for errors from async controller methods to be thrown here,
    // you need to catch the errors in the controller and use `next(err)`.
    // See https://expressjs.com/en/guide/error-handling.html
    app.use(errorHandler());

    return {
        app,
        dataSource
    };
}
