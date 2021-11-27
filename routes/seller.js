const express = require("express");
const router = express.Router();
router.use(express.json());

const sellers = require("../models/seller");

router.get("/", (req, res) => {
    res.json({ data: "Seller Page" });
});

router.post("/add", (req, res) => {
    const { newSeller } = req.body;
    sellers.push(newSeller);
    res.json({ data: "Seller Added Successfully.." });
});

router.put("/update/:id", (req, res) => {
    const sellerId = req.params.id;
    const { product } = req.body;
    const seller = sellers.filter((s) => s.SellerId === sellerId);

    if (seller.length > 0) {
        sellers[sellers.indexOf(seller[0])].ProductIds = product;
        res.json({ data: "Seller's Product ID Changed Successfully.." });
    } else {
        res.json({ data: "Seller not Found" });
    }
});

router.delete("/delete/:id", (req,res)=>{
    const sellerId=req.params.id;
    const seller = sellers.filter((seller) => seller.SellerId === sellerId);

    if(seller.length > 0){
        const index=sellers.indexOf(seller[0]);
        sellers.splice(index,1);
        res.json({data: "Seller Deleted Successfully.."});
    }else{
        res.json({data: "Seller not Found"});
    }
});

router.get("/list",(req,res)=>{
    res.json({data: sellers});
});

router.get("/list/:productname", (req, res) => {
    const name = req.params.productname;
    const products = require("../models/product");
    const product = products.filter((p) => (p.Title === name));
    var sellerList = [];

    if (product.length > 0) {
        sellerList = sellers.filter((s) => (s.SellerId == product[0].SellerID));
    } else {
        sellerList="No Record !";
    }

    res.json({ data: sellerList });
});

module.exports = router;