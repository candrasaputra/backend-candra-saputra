import { Request, NextFunction, Response } from 'express';
import { ErrorCodeMap, ErrorCodes } from 'src/domain/errors';

export const errorHandler = () => {
    // This is an express error handler, need to the 4 variable signature
    // eslint-disable-next-line
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        const statusCode = Number(ErrorCodeMap[err.error_code]);

        if (!Number.isNaN(statusCode)) {
            const logContext = {
                error_code: err.error_code,
                status_code: statusCode,
                context: err.context
            };

            console.info(logContext, 'API error');

            return res.status(statusCode).send({
                error_code: err.error_code,
                message: err.message
            });
        }

        console.error(err, 'unexpected error');

        return res.status(500).send({
            error_code: ErrorCodes.INTERNAL_SERVER_ERROR,
            message: 'Something unexpected happened, we are investigating this issue right now'
        });
    };
};
