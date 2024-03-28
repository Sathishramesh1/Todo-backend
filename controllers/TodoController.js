import {User} from '../../models/User.js'
import { Todo } from '../model/Todo.js';



const getAllTodo=async(req,res)=>{
    try {
     const userTodo=await Todo.find({user: req.user._id });
     

     if (userTodo.length === 0) {
        return res.status(404).send("No todos found for the user");
    }

    return res.status(200).json(userTodos);

    } catch (error) {
        console.log(error);
       return  res.status(500).send("Internal server Error")
        
    }


}

export {getAllTodo}

//to create todo

const createTodo=async(req,res)=>{
    try {
        if (!title) {
            return res.status(400).send("Title is required");
        }
       
        const newTodo = new Todo({
            title: title,
            user: req.user._id, 
           
        });

        
        const savedTodo = await newTodo.save();

        // Send back the created todo as a response
        return res.status(201).json(savedTodo);
        
    } catch (error) {
        console.log(error);
       return  res.status(500).send("Internal server Error")
        
    }
}

export {createTodo}