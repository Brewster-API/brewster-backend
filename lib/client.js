import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';

const Client = pg.Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

client.connect().then(() => {
  const { database, host, port } = client;
  console.log(`Connected to pg database ${database} on ${host}:${port}`);
});

export default client;
