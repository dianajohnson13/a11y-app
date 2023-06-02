import pg from 'pg';
const { Pool } = pg;

const localPoolConfig = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'a11ychecker'
};

const poolConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
} : localPoolConfig;

const pool = new Pool(poolConfig);
export default pool;
