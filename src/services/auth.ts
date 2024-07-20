/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { StandardError } from 'src/domain/standard-error';
import { ErrorCodes } from 'src/domain/errors';
import { DataSource, Repository } from 'typeorm';
import { getUserRepository } from 'src/libs/typeorm/repositories';
import { Users } from 'src/domain/user';

interface IGenericObject {
    [key: string]: any;
}

export class AuthService {
    readonly userRepository: Repository<Users>;

    constructor(dataSource: DataSource) {
        this.userRepository = getUserRepository(dataSource);
    }

    public async auth(username: string): Promise<IGenericObject> {
        if (!username) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'Username is required', {}, { username });
        }

        const user = await this.userRepository.findOne({
            where: {
                username
            }
        });

        if (!user) {
            throw new StandardError(ErrorCodes.AUTH_REJECTED, "Username doesn't exist", {}, { username });
        }

        const token = jwt.sign(
            {
                data: {
                    userId: user.id,
                    role: user.role,
                    username
                }
            },
            JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return {
            token
        };
    }
}
