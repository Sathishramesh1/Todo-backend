import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  // database: "postgres",
  password:"mypassword",
  port: process.env.DB_PORT,
});

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

