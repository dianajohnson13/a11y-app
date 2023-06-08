import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import pool from '../db';
import type { User } from '../types/users'

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const users = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    // CHECK IF USER EXISTS
    if (users.rows.length === 0) return res.status(401).json({error: "Email not found"});
    
    // CHECK PASSWORD
    const isValidPassword = await bcrypt.compare(password, users.rows[0].user_password);
    if (!isValidPassword) return res.status(401).json({error: "Invalid password"});

    // IF PASSWORD VALID, RETURN JWT 
    const tokens =  makeTokens(users.rows[0]);
    res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

const makeTokens = (user: User) => {
  const accessToken = jwt.sign(user, (process.env.ACCESS_TOKEN_SECRET as string), {expiresIn: '15m'});
  const refreshToken = jwt.sign(user, (process.env.REFRESH_TOKEN_SECRET as string), {expiresIn: '5d'});
  return { accessToken, refreshToken };
}

export default router;