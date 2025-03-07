import { Router } from "express";
import { addProductToCart, deleteProductFromCart, getCart, increaseQuantityProducts, reduceQuantityProducts } from "./cart.controller.js";
import { validatorAddProduct, validatorDeleteProduct, validatorGetProduct, validatorUpdateProduct } from "../middleware/cart-validator.js";

const router = Router()

router.post("/addCart", validatorAddProduct, addProductToCart)

router.get("/cart", validatorGetProduct, getCart)

router.delete("/deleteProductFromCart/:productId", validatorDeleteProduct, deleteProductFromCart)

router.put("/reduceQuantityProducts/:productId", validatorUpdateProduct, reduceQuantityProducts)

router.put("/increaseQuantityProducts/:productId", validatorUpdateProduct, increaseQuantityProducts)
export default router