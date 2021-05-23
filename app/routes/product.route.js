const controller = require("../controllers/product.controller")

module.exports = function (app) {
    app.post("/api/users/saveNewProduct", controller.saveNewProduct);
    app.get("/api/users/getAllProducts", controller.getAllProducts);
    app.put("/api/users/updateProduct", controller.updateProduct);
    app.delete("/api/users/deleteProduct/:pid", controller.deleteProduct);
}