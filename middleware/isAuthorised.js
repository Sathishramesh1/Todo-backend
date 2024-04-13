import { pool } from '../database/dbconnection';
import jwt from 'jsonwebtoken'

 async function getUserById(id) {
  try {
    const query = {
      text: 'SELECT _id, name, email FROM users WHERE _id = $1',
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows[0]; // Assuming only one user is returned
  } catch (error) {
    throw new Error('Error fetching user from the database');
  }
  }



// custom middleware
const isAuthorized = async (req,res,next) => {
    let token;
    if (req.header) {
      try {
        token = await req.headers["x-auth-token"];
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await getUserById(decode.id);
        next();
        
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server error" });
      }
    }
  };
  
  export {isAuthorized}