import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Proyecto Bimestral",
            version: "1.0.0",
            description: "API para la gestion de una tienda en linea",
            contact: {
                name: "Ramiro Morales ",
                email: "rmorales-2020045@kinal.org.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/bimestral/v1"
            }
        ]
    },
    apis: [
        "./src/auth/auth.routes.js",
        "./src/cart/cart.routes.js",
        "./src/category/category.routes.js",
        "./src/product/product.routes.js",
        "./src/invoice/invoice.routes.js",
        "./src/user/user.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }