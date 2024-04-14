import pkg from 'pg';
import dotenv from 'dotenv'
const { Pool } = pkg;

dotenv.config();
const pool = new Pool({
  user: "postgres",
  hostname:"mydb",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password:process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Ignore SSL certificate validation
  }
  
});
console.log("HELL",process.env.DB_PASSWORD)
const dbconnection = async () => {
  try {
    console.log("Database Host:", process.env.DB_HOST);
    console.log("Database Port:", process.env.DB_PORT);
    await pool.connect();
   
    console.log('Connected to the PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to the PostgreSQL database', error);
    process.exit(1);
  }
};

export { pool, dbconnection };

