import express, { Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json({users : users.rows});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // add them to the db
    const users = await pool.query(
      'INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *',
      [req.body.name, req.body.email, hashedPassword]);
    // return the new user
    const newUser = users.rows[0];
    res.json({user: {
      userId: newUser.user_id,
      name: newUser.user_email,
      email: newUser.user_email
    }});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

export default router;
