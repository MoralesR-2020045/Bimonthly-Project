import Cart from "./cart.model.js";

export const addProductToCart = async (req, res) => {
    try {
        const { id } = req.usuario
        const { productId, quantity } = req.body

        const cart = await Cart.findOne({ user: id });
        let productFound = false;
        if (cart) {
            for (let cartItem of cart.items) {
                if (cartItem.product.equals(productId)) {
                    cartItem.quantity = Number(cartItem.quantity) + Number(quantity)
                    productFound = true
                    cart.save()
                    break
                }
            }

            if (!productFound) {
                cart.items.push({ product: productId, quantity: quantity })
                await cart.save()
                return res.status(200).json({
                    message: "Product added to cart", cart: cart
                })
            }

            return res.status(200).json({
                message: "Product updated quantity cart", cart: cart
            })

        }

        const carting = await Cart.create({
            user: id, items: [{ product: productId, quantity: quantity }]
        });

        return res.status(201).json({
            message: "Product added to cart", cart: carting
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error adding product to cart", error: error.message
        });
    }
}

export const getCart = async (req, res) => {
    try {
        const { id } = req.usuario
        const cart = await Cart.findOne({ user: id });

        if (cart) {
            return res.status(200).json({
                cart: cart
            });
        }

        return res.status(404).json({
            message: "Cart not found"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error getting cart",
            error: error.message
        });
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const { id } = req.usuario
        const { productId } = req.params

        const cart = await Cart.findOne({ user: id });

        if (cart) {
            cart.items = cart.items.filter(item => !item.product.equals(productId));
            await cart.save();

            return res.status(200).json({
                message: "Product deleted from cart",
                cart: cart
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting product from cart",
            error: error.message
        });
    }
}

export const reduceQuantityProducts = async (req, res) => {
    try {
        const { id } = req.usuario
        const { productId } = req.params
        const {  quantity } = req.body

        const cart = await Cart.findOne({ user: id });

        if (cart) {
            for (let cartItem of cart.items) {
                if (cartItem.product.equals(productId)) {
                    cartItem.quantity -= quantity
                    cart.save()
                    break
                }
            }

            return res.status(200).json({
                message: "Product updated quantity cart", cart: cart
            })
        }

        return res.status(404).json({
            message: "Cart not found"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating product quantity in cart",
            error: error.message
        });
    }
}


export const increaseQuantityProducts = async (req, res) => {
    try {
        const { id } = req.usuario
        const { productId } = req.params
        const {  quantity } = req.body
        
        const cart = await Cart.findOne({ user: id });

        if (cart) {
            for (let cartItem of cart.items) {
                if (cartItem.product.equals(productId)) {
                    cartItem.quantity = Number(cartItem.quantity) + Number(quantity)
                    cart.save()
                    break
                }
            }

            return res.status(200).json({
                message: "Product updated quantity cart", cart: cart
            })
        }

        return res.status(404).json({
            message: "Cart not found"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating product quantity in cart",
            error: error.message
        });
    }
}