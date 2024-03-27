import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    authToken: {
        type: String 
    },
    resetToken: String
});

const User = mongoose.model("User", UserSchema);

export { User }
