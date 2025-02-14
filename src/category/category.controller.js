import Category from "./category.model.js";

export const addCategory = async (req, res) =>{
    try{
        const data = req.body;
        const category = await Category.create(data);
        return res.status(201).json({
            message: "Successfully created category",
            name: category.name,
            description: category.description,
        })
    
    }catch(err){
        return res.status(500).json({
            message: "Error creating category",
            error: err.message
        })
    }
}

export const existingCategory = async (req, res) =>{
    try{
        const categories = await Category.find().select(' name description');
        res.status(200).json({
            success: true,
            message: "Categories that exist:",
            categories:categories
        })

    }catch(err){
        return res.status(500).json({
            message: "Error when knowing existing categories",
            error: err.message
        })
    }
}

