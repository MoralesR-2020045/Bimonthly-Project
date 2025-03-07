import Product from "./product.model.js"

export const addProduct = async (req, res) => {
    try {
        const data = req.body
        const productImage = req.file ? req.file.filename : null

        data.productImage = productImage

        const product = await Product.create(data)

        if (product) {
            return res.status(201).json({
                message: "Product created successfully",
                product: product
            })
        }
        return res.status(400).json({
            message: "Error creating product",
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error creating product",
            error: err.message
        })
    }
}

export const productCatalog = async (req, res) => {
    try {   
        const products = await Product.find({ status: true }) 

        if (products) {
            return res.status(200).json({
                message: "Catalog products successfully",
                products: products
            })
        }
        return res.status(404).json({
            message: "No products found"
        })
    }catch (err) {
        return res.status(500).json({
            message: "Error getting products",
            error: err.message
        })
    }
}

export const searchProduct = async (req, res) => {
    try {
        const { name } = req.params
        const product = await Product.findOne({ name: name, status: true })

        if (product) {
            return res.status(200).json({
                message: "Product found successfully",
                product: product
            })
        }
        return res.status(404).json({
            message: "Product not found"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error searching products",
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => { 
    try {
        const { uid } = req.params
        const dataProduct = req.body

        const product = await Product.findByIdAndUpdate(uid, dataProduct, { new: true })

        if (product) {
            return res.status(200).json({
                message: "Product updated successfully",
                product: product
            })
        }
        return res.status(404).json({
            message: "Product not found updated"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error updating product",
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const { uid } = req.params

        const product = await Product.findByIdAndUpdate(uid, { status: false }, { new: true })
        
        if (product) {
            return res.status(200).json({
                message: "Product deleted successfully",
            })
        }
        return res.status(404).json({
            message: "Product not found deleted"
        })
    }catch (err) {
        return res.status(500).json({
            message: "Error deleting product",
            error: err.message
        })
    }
}