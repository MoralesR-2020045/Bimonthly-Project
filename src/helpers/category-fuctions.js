import Category from "../category/category.model.js";

export const defaultCategory = async () => {
    try {
        const categoryExists = await Category.findOne({ name: "General" });

        if (!categoryExists) {
            await Category.create({
                name: "General",
                description: "Productos de tipo general sin clasificacion alguna o restriccion al publico",
            })
        }
    } catch (err) {
        console.error("Error creating administrador");
        console.log(err);
    }
}