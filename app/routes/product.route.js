const controller = require("../controllers/product.controller")

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
        );
       
        next();
      });
    app.post("/api/users/saveNewProduct", controller.saveNewProduct);
    app.get("/api/users/getAllProducts", controller.getAllProducts);
    app.put("/api/users/updateProduct", controller.updateProduct);
    app.delete("/api/users/deleteProduct/:pid", controller.deleteProduct);
}