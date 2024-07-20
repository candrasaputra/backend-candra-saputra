/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Request, Response, Router } from 'express';
import { AuthService } from 'src/services/auth';

export class AuthController {
    private readonly authService: AuthService;

    private router: Router;

    constructor(authService: AuthService) {
        this.authService = authService;

        this.router = Router();
        this.router.post('/', this.auth.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    public async auth(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { username } = req.body;

            const result = await this.authService.auth(String(username));

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}
