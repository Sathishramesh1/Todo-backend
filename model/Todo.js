import mongoose from "mongoose";

//  Todo Schema
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});

//  Todo model
const Todo = mongoose.model("Todo", TodoSchema);

export { Todo };
