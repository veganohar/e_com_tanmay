const controller = require("../controllers/product.controller")

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
        );
       
        next();
      });
    app.post("/api/products/saveNewProduct", controller.saveNewProduct);
    app.get("/api/products/getAllProducts", controller.getAllProducts);
    app.get("/api/products/getProductById/:pid", controller.getProductById);
    app.put("/api/products/updateProduct", controller.updateProduct);
    app.delete("/api/products/deleteProduct/:pid", controller.deleteProduct);
}