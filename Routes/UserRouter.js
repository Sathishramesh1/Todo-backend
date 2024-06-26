import express from 'express'
import {Register} from '../controllers/UserController.js'
import {Login} from '../controllers/UserController.js'
// import {Forget} from '../controllers/UserController/'
// import {Reset} from '../controllers/UserController/Reset.js'


const router=express.Router();

//route for registering new user
router.route('/register').post(Register);

//route for login
router.route('/login').post(Login);

//route for generating password reset mail
// router.route('/forget').post(Forget);

//route for resetting new password
// router.route('/reset').post(Reset);




export {router as UserRouter}