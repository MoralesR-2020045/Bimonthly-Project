'use strict'

import {Schema, model} from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
    },
    description: {
        type: String,
        required: [true,"Description is required"],
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    soldcount: {
        type: Number,
        default: 0
    },
    imageproduct: {
        type: String, 
        required: false
    }
})

export default model ("Product", productSchema)