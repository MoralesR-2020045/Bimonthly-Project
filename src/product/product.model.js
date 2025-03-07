'use strict'

import {Schema, model} from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
        maxLength: [80, `Can not be overcome 50 characters`]
    },
    description: {
        type: String,
        required: [true,"Description is required"],
        maxLength: [500, `Can not be overcome 50 characters`]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category is required"]
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        default: 0,
        min: 0
    },
    existence: {
        type: Boolean,
        default: true
    },
    bestSelling: {
        type: Number,
        default: 0
    },
    productImage: {
        type: String, 
    }, 
    status: {
        type: Boolean,
        default: true
    }
})

productSchema.methods.toJSON = function () {
    const { __v, status, ...product } = this.toObject()
    return product
}

export default model ("Product", productSchema)