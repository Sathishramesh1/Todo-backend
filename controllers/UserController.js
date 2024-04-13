import * as bcrypt from 'bcrypt'
import {User} from '../model/User.js'
import jwt from 'jsonwebtoken';
import { pool } from '../database/dbconnection.js';



//user login
const Login=async(req,res)=>{

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const client = await pool.connect();

    try {
        // Query to find the user by email
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await client.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Email is not registered.' });
        }

        const user = userResult.rows[0];

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Generate jwt token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        client.release();  
    }

}

export {Login}


//registering new users
const Register=async(req,res)=>{

    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  new user 
        await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);

        return res.status(201).json({ message: 'New user created' });
    } catch (error) {
        console.error('Error creating new user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

export {Register}