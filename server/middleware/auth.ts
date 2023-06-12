import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

//import type { User } from '../types/users';


// 6/12/23 -- not yet in use
export const authenticateToken = (req: any, res: Response, next: () => void) => {
    const authHeader = req.headers.authorization; // Bearer Token
    const token: string | undefined = authHeader && authHeader.split(' ')[1]; 
    if (token === null || token === undefined) return res.status(401).json({ error: "Missing token" });

    jwt.verify(token, (process.env.ACCESS_TOKEN_SECRET as string), (error, user) => {
        if (error) return res.status(403).json({error: error.message});
        req.user = user;
        next();
    });
}