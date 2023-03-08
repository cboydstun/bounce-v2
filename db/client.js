const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/bouncev2';

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});

module.exports = client;
