import { pool } from '../database/dbconnection.js';

async function createTables() {
    let client; 

    try {
        client = await pool.connect(); // Assign client in the try block
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
    } finally {
        if (client) {
            client.release(); 
        }
    }
}

export { createTables };

// Function to check for the
export const createTodosTableIfNotExists = async () => {
  try {
      const query = `
          CREATE TABLE IF NOT EXISTS todos (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              user_id INT NOT NULL,
              status BOOLEAN DEFAULT FALSE, 
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
      `;
      await pool.query(query);
      console.log('Todos table created or already exists');
  } catch (error) {
      console.error('Error creating todos table:', error);
  }
};