import * as bcrypt from 'bcrypt'
import {User} from '../../models/User.js'
import jwt from 'jsonwebtoken'



//user login
const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        let user= await User.findOne({email:email});

if (!user) {
    return res.status(401).json({ message: "Email is not Registered" });
      }

const passwordMatch = await bcrypt.compare(password, user.password);

if (!passwordMatch) {
         return res.status(401).json({ message: "Wrong Password" });
      }
           
const jwttoken = jwt.sign({id:user._id}, process.env.SECRET_KEY);
        
          res.status(200).json({ jwttoken,message:"login success" });    
    } 
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error")
        
    }

}

export {Login}


//
const Register=async(req,res)=>{
 
    try{
        // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    // console.log(user)
    if (user) {
      return res.status(400).send('That user already exisits!');}

    const {password}=req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser= await new User({ ...req.body, password: hashedPassword }).save();
    
    res.status(201).json({
        status:'success',
        message:"new user created"
    })
    }catch(err){
        console.log("error in creating new user",err);
        res.status(500).send("Internal Error");
    }

}

export {Register}