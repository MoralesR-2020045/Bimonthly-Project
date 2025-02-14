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