import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    resetToken:String
});

const User=mongoose.model("User",UserSchema);

export {User}