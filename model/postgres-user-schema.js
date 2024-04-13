import { pool } from '../database/dbconnection.js';

async function createTables() {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        reset_token VARCHAR(255)
      )
    `);
    console.log('User table created successfully');
   
  } catch (error) {
    console.error('Error creating user table:', error);
  }finally{
    
      client.release();  
    
  }
}

export { createTables };