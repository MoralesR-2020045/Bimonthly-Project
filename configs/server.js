'use strict'

import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import { defaultCategory } from "../src/helpers/category-fuctions.js"
import productRoutes from "../src/product/product.routes.js"
import cartRoutes from "../src/cart/cart.routes.js"
import invoicesRoutes from "../src/invoice/invoice.routes.js"
import { swaggerDocs, swaggerUi } from "./swagger.js";
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
}

const routes = (app) => {
    app.use("/bimonthlyProject/v1/auth", authRoutes);
    app.use("/bimonthlyProject/v1/user", userRoutes);
    app.use("/bimonthlyProject/v1/category", categoryRoutes);
    app.use("/bimonthlyProject/v1/product", productRoutes);
    app.use("/bimonthlyProject/v1/cart", cartRoutes);
    app.use("/bimonthlyProject/v1/invoices", invoicesRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        routes(app)
        defaultCategory()
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}