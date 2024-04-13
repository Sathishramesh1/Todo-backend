import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {dbconnection} from './database/dbconnection.js'

import { UserRouter } from './Routes/UserRouter.js'
import { TodoRouter } from './Routes/TodoRouter.js'
import {isAuthorized} from './middleware/isAuthorised.js'



//configuration .env files
dotenv.config();



//assign app to express server
const app=express();
app.use(cors());
app.use(express.json());




//database connection
await dbconnection()
 
    const PORT = process.env.PORT || 3000;

    // Routes
    app.use("/api/user/v1", UserRouter);
    app.use("/api/todo/v1", isAuthorized, TodoRouter);

    // Default route
    app.get("/", (req, res) => {
      return res.status(200).send("Server working");
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  
   
  