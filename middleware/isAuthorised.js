import { pool } from '../database/dbconnection.js';
import jwt from 'jsonwebtoken'

async function getUserById(id) {
  let client;

  try {
    client = await pool.connect(); // Acquire client from the pool
    const query = 'SELECT id, name, email FROM users WHERE id = $1';
    console.log(query);
    const result = await client.query(query, [id]);
    const user = result.rows[0];
    if (!user) {
      throw new Error('No user found');
    }
    return user;
  } catch (error) {
    throw new Error('Error fetching user from the database');
  } finally {
    if (client) {
      client.release(); // Release the client back to the pool
    }
  }
}




// custom middleware
const isAuthorized = async (req,res,next) => {
    let token;
    if (req.header) {
      try {
        token = await req.headers["x-auth-token"];
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode)
        req.user = await getUserById(decode.id);
        next();
        
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server error" });
      }
    }
  };
  
  export {isAuthorized}