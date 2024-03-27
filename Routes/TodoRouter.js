import express from 'express'


const router=express.Router();


//route for get all todo
router.route('/getall').get();


//create a todo
router.route("/create").post();

//marking todo status
router.route("/mark/:id").patch();





export {router as TodoRouter}