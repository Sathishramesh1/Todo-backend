import express from 'express'
import { createTodo, getAllTodo, updateStatus } from '../controllers/TodoController.js';


const router=express.Router();


//route for get all todo
router.route('/getall').get(getAllTodo);


//create a todo
router.route("/create").post(createTodo);

//marking todo status
router.route("/mark/:id").patch(updateStatus);





export {router as TodoRouter}