const express = require("express");
const router = express.Router();
router.use(express.json());

const companies = require("../models/company");
const products = require("../models/product");

router.get("/", (req, res) => {
    res.json({ data: "Company Page" });
});

router.post("/add", (req, res) => {
    const { newCompany } = req.body;
    companies.push(newCompany);
    res.json({ data: "Company Added Successfully.." });
});

router.put("/update/:id", (req, res) => {
    const companyId = req.params.id;
    const { product } = req.body;
    const company = companies.filter((company) => company.CompanyId === companyId);

    if (company.length > 0) {
        companies[companies.indexOf(company[0])].ProductIds = product;
        res.json({ data: "Company's Product ID Changed Successfully.." });
    } else {
        res.json({ data: "Company not Found" });
    }
});

router.delete("/delete/:id", (req, res) => {
    const companyId = req.params.id;
    const company = companies.filter((c) => c.CompanyId === companyId);

    if (company.length > 0) {
        const index = companies.indexOf(company[0]);
        companies.splice(index, 1);
        res.json({ data: "Company Deleted Successfully.." });
    } else {
        res.json({ data: "Company not Found" });
    }
});

router.get("/list", (req, res) => {
    res.json({ data: companies });
});

router.get("/list/:productname", (req, res) => {
    const name = req.params.productname;
    const products = require("../models/product");
    const product = products.filter((p) => (p.Title === name));
    var companyList = [];

    if (product.length > 0) {
        companyList = companies.filter((c) => (c.CompanyId === product[0].CompanyId));
    } else {
        companyList="No Record !";
        //res.json({ data: "No Records Found" });
    }

    res.json({ data: companyList });
});

module.exports = router;