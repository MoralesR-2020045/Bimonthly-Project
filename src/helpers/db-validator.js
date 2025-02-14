import Category from "../category/category.model.js";
import User from "../user/user.model.js"

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