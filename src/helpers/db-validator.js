import Category from "../category/category.model.js";
import User from "../user/user.model.js";
import Product from "../product/product.model.js";
import Invoice from "../invoice/invoice.model.js";

export const emailExists = async (email = "") => {
    const exist = await User.findOne({email});
    if(exist){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const  userNameExists = async (username = "") => {
    const exist = await User.findOne({username});
    if(exist){
        throw new Error(`The user name ${username} is already registered`)
    }
}

export const userExist = async (uid = "") =>{
    const exist = await User.findById(uid)
    if(!exist){
        throw new Error(`The uid has not been found`)
    }

}

export const categoryExist = async (uid = "") =>{
    const exist = await Category.findById(uid)
    if(!exist){
        throw new Error(`The uid has not been found`)
    }
}

export const  categoryNameExist = async (categories = "") => {
    const exist = await Category.findOne({categories});
    if(exist){
        throw new Error(`There is already a category with this name.`)
    }
}

export const productName = async (name = "") => {
    const exist = await Product.findOne({name});
    if(exist){
        throw new Error(`The product with this name already exists.`)
    }
}

export const productExist = async (uid = "") =>{
    const exist = await Product.findById(uid)
    if(!exist){
        throw new Error(`The product not found`)
    }
}

export const invoiceId = async (uid = "") =>{
    const exist = await Invoice.findById(uid)
    if(!exist){
        throw new Error(`The invoice not found`)
    }
}
