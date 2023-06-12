import jwt from 'jsonwebtoken';

import type { User } from '../types/users'

export const makeTokens = (user: User) => {
    const accessToken = jwt.sign(user, (process.env.ACCESS_TOKEN_SECRET as string), {expiresIn: '15m'});
    const refreshToken = jwt.sign(user, (process.env.REFRESH_TOKEN_SECRET as string), {expiresIn: '5d'});
    return { accessToken, refreshToken };
}