const express = require("express");
const app = express();
app.use(express.json());

const port = 5000;

const prodRoute = require("./routes/product");
const companyRoute = require("./routes/company");
const sellerRoute = require("./routes/seller");

app.use("/product", prodRoute);
app.use("/company", companyRoute);
app.use("/seller", sellerRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("App Running on Port " + port);
});