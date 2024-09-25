import mongoose from "mongoose";
import addressSchema from "./address.js";

const personSchema= new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    date_of_birth:{
        type: Date
    },
    cnic:{
        type: String,
        required: true
    },
    Address: addressSchema,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
})

export default mongoose.model('Person', personSchema);