const express = require('express');
const { createProduct, getAllProducts, filterProduct, productPagnination, productById, updateProduct, deleteProduct } = require('../controller/productController');
const isLoggedIn = require('../middleware/isLoggedIn');
const productRouter = express.Router();

productRouter.post('/createproduct', isLoggedIn, createProduct);
productRouter.get('/getproducts', isLoggedIn, getAllProducts);
productRouter.get('/filter', isLoggedIn, filterProduct);
productRouter.get('/pagination', isLoggedIn, productPagnination);
productRouter.get('/productById/:id', isLoggedIn, productById);
productRouter.put('/update/:id', isLoggedIn, updateProduct);
productRouter.delete('/delete/:id', isLoggedIn, deleteProduct);


module.exports = {
    productRouter
}