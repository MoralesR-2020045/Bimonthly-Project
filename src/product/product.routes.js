import { Router } from "express";
import { addProduct, productCatalog, searchProduct, updateProduct, deleteProduct } from "./product.controller.js";
import { validatorAddProduct, validatorDeleteProduct, validatorProduct, validatorUpdateInfoProduct, validatorUpdateProduct } from "../middleware/product-validator.js";
import { uploadProductImage } from "../middleware/multer-uploads.js";

const router = Router()

router.post("/addProduct", uploadProductImage.single("productImage"), validatorAddProduct, addProduct)

router.get("/productCatalog", validatorProduct, productCatalog)

router.get("/searchProduct/:name", validatorProduct, searchProduct)

router.put("/updateInformationProduct/:uid", validatorUpdateInfoProduct, updateProduct)

router.put("/updateSpecificDetailsProduct/:uid", validatorUpdateProduct, updateProduct)

router.delete("/deleteProduct/:id", validatorDeleteProduct, deleteProduct)

export default router