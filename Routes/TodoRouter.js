import express from 'express'
import { createTodo, getAllTodo } from '../controllers/TodoController';


const router=express.Router();


//route for get all todo
router.route('/getall').get(getAllTodo);


//create a todo
router.route("/create").post(createTodo);

//marking todo status
router.route("/mark/:id").patch();





export {router as TodoRouter}