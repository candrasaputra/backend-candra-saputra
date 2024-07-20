import 'reflect-metadata'; // for TypeORM
import { connect } from './db-connect';
import { HealthcheckController } from 'src/controllers/healthcheck';
import { HealthcheckService } from 'src/services/healthcheck';
import { ProductController } from 'src/controllers/product';
import { ProductService } from './services/product';
import { TransactionController } from './controllers/transaction';
import { TransactionService } from './services/transaction';
import { AuthService } from './services/auth';
import { AuthController } from './controllers/auth';

/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers, queue runners and crons
 */
export async function init() {
    // repositories
    const dataSource = await connect();

    // services
    const healthcheckService = new HealthcheckService(dataSource);
    const productService = new ProductService(dataSource);
    const transactionService = new TransactionService(dataSource);
    const authService = new AuthService(dataSource);

    // controllers
    const healthcheckController = new HealthcheckController(healthcheckService);
    const productController = new ProductController(productService);
    const transactionController = new TransactionController(transactionService);
    const authController = new AuthController(authService);

    return {
        dataSource,
        healthcheckController,
        productController,
        transactionController,
        authController,
        productService,
        transactionService,
        authService
    };
}
