'use strict'

import { Schema, model } from "mongoose";

const cartSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            }
        }]
})

cartSchema.methods.toJSON = function () {
    const { __v, status, ...cart } = this.toObject()
    return cart
}

export default model("Cart", cartSchema)