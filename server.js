const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require("body-parser");
const db = require("./app/models");
const config = require("./app/config/db.config");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.listen(port,()=>{
    console.log("Your App is running on the Port " + port);
})

db.mongoose.connect(`mongodb://${config.HOST}:${config.PORT}/${config.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log("DB connected successfully");
}).catch(
    (err)=>{
        console.log(err);
        process.abort();
    }
)

app.get("/",(req,res)=>{
    res.send(["Hello world","Welcome","Express JS"]);
})

require("./app/routes/product.route")(app);