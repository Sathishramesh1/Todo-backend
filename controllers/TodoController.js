import { pool } from '../database/dbconnection.js';

const getAllTodo=async(req,res)=>{
    try {
    
        const query = {
            text: 'SELECT * FROM todos WHERE user_id = $1',
            values: [req.user._id]
        };

        // Execute the query using the datase
        const result = await pool.query(query);

        
        const userTodo = result.rows;

        
        return res.status(200).json(userTodo);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return res.status(500).send("Internal server Error");
    }

}

export {getAllTodo}

//to create todo
const createTodo=async(req,res)=>{
    try {

        const { title } = req.body;

        if (!title) {
            return res.status(400).send("Title is required");
        }
        const query = {
            text: 'INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *',
            values: [title, req.user._id]
        };

    
        const result = await pool.query(query);

        // Extract the inserted todo from the query result
        const newTodo = result.rows[0];

        // Send back the created todo as a JSON response with a status code of 201 (Created)
        return res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        return res.status(500).send("Internal server Error");
    }

}

export {createTodo}


//to do update todo status

const updateStatus=async(req,res)=>{
    try {

        const todoId = req.params.id;

        const query = {
            text: 'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
            values: [true, todoId]
        };

        const result = await pool.query(query);

        // Check if a todo was updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo item not found" });
        }        
        const updatedTodo = result.rows[0];

        return res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo status:', error);
        return res.status(500).send("Internal server Error");
    }
}

export {updateStatus}

//handle edit
const handleEdit=async(req,res)=>{
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const query = {
            text: 'UPDATE todos SET title = $1 WHERE id = $2 RETURNING *',
            values: [title, id]
        };

        const result = await pool.query(query);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo item not found" });
        }

        const updatedTodo = result.rows[0];

        return res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo title:', error);
        return res.status(500).send("Internal server Error");
    }

}

export {handleEdit}



//to remove the todo

const handleDelete=async(req,res)=>{
    try {
        const { id } = req.params;

        const query = {
            text: 'DELETE FROM todos WHERE id = $1 RETURNING *',
            values: [id]
        };

        const result = await pool.query(query);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo item not found" });
        }

        const deletedTodo = result.rows[0];

        return res.status(200).json(deletedTodo);
    } catch (error) {
        console.error('Error deleting todo:', error);
        return res.status(500).send("Internal server Error");
    }
}
export {handleDelete}