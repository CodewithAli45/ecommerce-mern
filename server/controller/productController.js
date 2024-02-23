const Category = require("../model/Category");
const Product = require("../model/Product");

// create product data
// @route POST /product/createProduct

const createProduct = async (req, res) => {
    const {name, description, category, sizes, colors, user, price, totalQty, brand} = req.body;

    try {
        const existingProduct = await Product.findOne({name});
        if(existingProduct){
            return res.status(403).json({
                status: "failure", 
                msg: "product already exists"
            });
        }
        const newProduct = new Product({
            name, description, category, sizes, colors, user: req.userAuthId, price, totalQty, brand
        });
        const categoryFound = await Category.findOne({name: category});
        if(!categoryFound){
            return res.status(404).json({
                message: "No category found, create category first"
            })
        }
        await Product.create(newProduct);
        categoryFound.product.push(newProduct);
        await categoryFound.save();
        res.status(201).json({
            msg: "product created successfully",
            data: newProduct
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            msg: error.message
        })
    }
}


// create product data
// @route POST /product/createProduct

const getAllProducts = async (req, res) => {
    let productQuery = Product.find();
    try {

        if(req.query.name){
            productQuery = Product.find({
                name: {$regex: req.query.name, $options: "i"}
            })
        }
        const products = await productQuery.find();

        res.status(200).json({
            status: "success", 
            data: products
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            msg: error.message
        })
    }
}

const filterProduct = async (req, res) => {
    const { name, brand, minPrice, maxPrice, category} = req.query;
    const query = {};
    try {
        if(name){
            query.name = { $regex: new RegExp(name, 'i')}
        }
        if(brand){
            query.brand = brand
        }
        if(category){
            query.category = category
        }
        if(minPrice && maxPrice){
            query.price = {$gte: parseInt(minPrice), $lte: parseInt(maxPrice)}
        }else if(minPrice){
            query.price = {$gte: parseInt(minPrice)}
        } else if(maxPrice){
            query.price = {$lte: parseInt(maxPrice)}
        }
        const products = await Product.find(query);
        res.status(200).json({
            status: "Success",
            data: products
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            msg: error.message
        })
    }
}
const productPagnination = async(req, res) => {
    const {page, limit} = req.query;

    try {
        const skipSize = (parseInt(page) - 1) * parseInt(limit);
        const products = await Product.find().skip(skipSize).limit(parseInt(limit));
        res.status(200).json({
            status: "Success",
            data: products
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            msg: error.message
        })
    }
}

const productById = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            status: "Successfull",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            msg: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {sizes, price, brand} = req.body;
    try {
        const existingProduct = await Product.findByIdAndUpdate(id, {sizes, price, brand}, {new: true});
        if(!existingProduct){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        await existingProduct.save();
        res.status(201).json({
            status: "successfully updated",
            data: existingProduct
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            msg: error.message
        })
    }
}
const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({
                message: "Product not available in the database"
            })
        }
        res.status(200).json({
            status: "successfully deleted",
            data: product.name
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            msg: error.message
        })
    }
}
module.exports = {
    createProduct,
    getAllProducts,
    filterProduct,
    productPagnination,
    productById,
    updateProduct,
    deleteProduct
}