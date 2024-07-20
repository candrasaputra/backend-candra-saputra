import { NextFunction, Response } from 'express';
import { ErrorCodes } from 'src/domain/errors';
import passport from 'passport';
import { StandardError } from 'src/domain/standard-error';

export const authenticate = (req: any, res: Response, next: NextFunction) =>
    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next(new StandardError(ErrorCodes.UNAUTHORIZED_ERROR, "User don't have permission"));
        }

        req.user = user;
        next();
    })(req, res, next);
