const e = require("express");
const express = require("express");
const router = express.Router();
router.use(express.json());

const products = require("../models/product");

router.get("/", (req, res) => {
    res.json({ data: "Product Page" });
});

router.post("/add", (req, res) => {
    const { newProd } = req.body;
    products.push(newProd);
    res.json({ data: "Product Added Successfully.." });
});

router.put("/update/:id", (req, res) => {
    const productId = req.params.id;
    const category = req.body.Category;
    const product = products.filter((product) => product.ProductId === productId);

    if (product.length > 0) {
        products[products.indexOf(product[0])].Category = category;
        res.json({ data: "Products Category Changed Successfully.." });
    } else {
        res.json({ data: "Product not Found" });
    }
});

router.delete("/delete/:id", (req,res)=>{
    const productId=req.params.id;
    const product = products.filter((product) => product.ProductId === productId);

    if(product.length > 0){
        const index=products.indexOf(product[0]);
        products.splice(index,1);
        res.json({data: "Product Deleted Successfully.."});
    }else{
        res.json({data: "Product not Found"});
    }
});

router.get("/list",(req,res)=>{
    res.json({data: products});
});

router.get("/company/:companyid", (req, res) => {
    const companyId = req.params.companyid;
    const product = products.filter((p) => (p.CompanyId === companyId));
    res.json({data: product});
});

router.get("/seller/:sellerid", (req, res) => {
    const sellerId = req.params.sellerid;
    const product = products.filter((p) => (p.SellerID == sellerId));
    res.json({data: product});
});

module.exports = router;