import { Todo } from '../model/Todo.js';


const getAllTodo=async(req,res)=>{
    try {
     const userTodo=await Todo.find({user: req.user._id });
    return res.status(200).json(userTodo);

    } catch (error) {
        console.log(error);
       return  res.status(500).send("Internal server Error")
        
    }


}

export {getAllTodo}

//to create todo
const createTodo=async(req,res)=>{
    try {
        const {title}=req.body;
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


//to do update todo status

const updateStatus=async(req,res)=>{
    try {
        const todoId = req.params.id;

    const todo = await Todo.findById(todoId);

   
    if (!todo) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    
    todo.completed = true; 
    await todo.save();

    
return  res.status(200).json(todo);

    } catch (error) {
        console.log(error);
        return  res.status(500).send("Internal server Error")
    }
}

export {updateStatus}

const handleEdit=async(req,res)=>{
    try {
        const todoId = req.params.id;
        const {title}=req.body;

    const todo = await Todo.findById(todoId);

   
    if (!todo) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    
    todo.title = title; 
    await todo.save();

    
return  res.status(200).json(todo);

        
    } catch (error) {
        console.log(error);
        return  res.status(500).send("Internal server Error");
        
    }
}

export {handleEdit}


//to remove the todo

const handleDelete=async(req,res)=>{
    try {

        const todoId = req.params.id;
      


        const deletedTodo = await Todo.findByIdAndDelete(todoId);

    
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo item not found" });
        }

      
        return res.status(200).json(deletedTodo);
        
    } catch (error) {
        console.log(error);
        return  res.status(500).send("Internal server Error");
        
    }
}
export {handleDelete}