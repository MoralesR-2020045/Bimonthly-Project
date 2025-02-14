import Category from "./category.model.js";

export const addCategory = async (req, res) => {
    try {
        const data = req.body;
        const category = await Category.create(data);
        return res.status(201).json({
            message: "Successfully created category",
            name: category.name,
            description: category.description,
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error creating category",
            error: err.message
        })
    }
}

export const existingCategory = async (req, res) => {
    try {
        const categories = await Category.find().select(' name description');

        if (categories.status === true) {
            res.status(200).json({
                success: true,
                message: "Categories that exist",
                categories: categories
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: "Error when knowing existing categories",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body
        const category = await Category.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            msg: 'The client has been edited correctly',
            id: category._id,
            name: category.name,
            description: category.description
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error editing client',
            error: err.message
        });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { uid } = req.params
        await Category.findByIdAndUpdate(uid, { status: false }, { new: true })
        /* await Category.updateMany(
             { category: uid }, // Filtra a los usuarios que tienen el curso en su lista
             { $pull: { category: uid } } // Remueve el id del curso de la lista
         );*/
        return res.status(200).json({
            success: true,
            message: "Deleted category",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error when deleting category",
            error: err.message
        })
    }
}