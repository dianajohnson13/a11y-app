import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import pool from '../db';
import type { User } from '../types/users'
import { makeTokens } from '../utils/auth';

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

// Uses refresh token to generate new token
router.get('/refresh_token', (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;
  
    if (refreshToken === null) return res.status(401).json('Missing token');
    // If refresh token is accurate, remake token
    jwt.verify(refreshToken, (process.env.ACCESS_TOKEN_SECRET as string), (error: any, user: any) => {
      if (error) return res.status(403).json({error:(error as Error).message});
      let tokens = makeTokens(user as User);
      res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
      return res.json(tokens);
    });
  } catch (error) {
    res.status(401).json({error: (error as Error).message});
  }
});

// Delete refresh token to logout  
router.delete('/refresh_token', (req: Request, res: Response) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({message:'Refresh token deleted.'});
  } catch (error) {
    res.status(401).json({error: (error as Error).message});
  }
});

export default router;