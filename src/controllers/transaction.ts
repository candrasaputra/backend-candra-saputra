import { Request, Response, NextFunction, Router } from 'express';
import { TransactionService } from 'src/services/transaction';
import { authenticate } from './middlewares/authenticate';
import { merchantAuthorization } from './middlewares/merchant-authorization';
import { IActiveUser } from 'src/services/types';

export class TransactionController {
    private readonly transactionService: TransactionService;

    private router: Router;

    constructor(transactionService: TransactionService) {
        this.transactionService = transactionService;

        this.router = Router();

        this.router.use(authenticate);
        this.router.get('/', merchantAuthorization, this.getTransactions.bind(this));
        this.router.post('/', this.checkout.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    public async getTransactions(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const result = await this.transactionService.getTransactions();

            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }

    public async checkout(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { username } = <IActiveUser>req.user;

            const result = await this.transactionService.checkout(username, req.body);

            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }
}
