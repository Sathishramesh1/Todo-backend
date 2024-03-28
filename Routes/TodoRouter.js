import express from 'express'
import { createTodo, getAllTodo, handleDelete, handleEdit, updateStatus } from '../controllers/TodoController.js';


const router=express.Router();


//route for get all todo
router.route('/getall').get(getAllTodo);


//create a todo
router.route("/create").post(createTodo);

//marking todo status
router.route("/mark/:id").patch(updateStatus);

//editing todo title
router.route("edit/:id").put(handleEdit);

//delete the todo
router.route("/remove/:id").delete(handleDelete)





export {router as TodoRouter}