import { Request, Response, NextFunction, Router } from 'express';
import { ProductService } from 'src/services/product';
import { authenticate } from './middlewares/authenticate';
import { merchantAuthorization } from './middlewares/merchant-authorization';
import { IActiveUser } from 'src/services/types';

export class ProductController {
    private readonly productService: ProductService;

    private router: Router;

    constructor(productService: ProductService) {
        this.productService = productService;
        this.router = Router();

        this.router.use(authenticate);
        this.router.post('/', merchantAuthorization, this.createProduct.bind(this));
        this.router.get('/', this.getProducts.bind(this));
        this.router.delete('/:productId', merchantAuthorization, this.deleteProduct.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    public async createProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { title, description, price } = req.body;
            const { userId } = <IActiveUser>req.user;

            const result = await this.productService.createProduct(userId, { title, description, price });
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }

    public async getProducts(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const result = await this.productService.getProducts();

            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }

    public async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { productId } = req.params;

            const result = await this.productService.deleteProduct(productId);

            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }
}
