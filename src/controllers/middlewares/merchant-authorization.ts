import { NextFunction, Response } from 'express';
import { ErrorCodes } from 'src/domain/errors';
import { StandardError } from 'src/domain/standard-error';

export const merchantAuthorization = (req: any, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user.role !== 'MERCHANT') {
        return next(new StandardError(ErrorCodes.UNAUTHORIZED_ERROR, "User don't have permission"));
    }

    next();
};
