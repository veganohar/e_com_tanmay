const controller = require("../controllers/product.controller")

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
        );
       
        next();
      });
    app.post("/api/producs/saveNewProduct", controller.saveNewProduct);
    app.get("/api/producs/getAllProducts", controller.getAllProducts);
    app.put("/api/producs/updateProduct", controller.updateProduct);
    app.delete("/api/producs/deleteProduct/:pid", controller.deleteProduct);
}