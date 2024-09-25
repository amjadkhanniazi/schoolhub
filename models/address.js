import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    house_no:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    town:{
        type: String
    },
    mohallah:{
        type: String
    },
    city:{
        type: String,
        required: true
    },
    postal_code:{
        type: Number,
        required: true
    },
    province:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true,
        default: 'Pakistan'
    },
    description:{
        type: String
    }
})

export default addressSchema;