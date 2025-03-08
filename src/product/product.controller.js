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

export const getBestSellers = async (req, res) => {
    try {
        const bestSellers = await Product.find({status: true  })
            .sort({ sold: -1 }) 
            .limit(10) 

        return res.json({ 
            bestSellers 
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error fetching best-selling products", 
            error: error 
        })
    }
}

export const searchProducts = async (req, res) => {
    try {
        const { name } = req.body 

        const products = await Product.find({ name: { $regex: name, $options: 'i' } })

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found" 
            })
        }

        return res.status(200).json({ 
            products 
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error searching for products", 
            error: error 
        })
    }
}

export const filterProductsByCategory = async (req, res) => {
    try {
        const { id } = req.params

        const products = await Product.find({ category: id })

        if (products.length === 0) {
            return res.status(404).json({ 
                message: "No products found for this category" 
            })
        }

        return res.status(200).json({ 
            products 
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error filtering products by category", 
            error: error 
        })
    }
}