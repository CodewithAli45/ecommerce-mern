const { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require('../controller/CategoryController');
const isLoggedIn = require('../middleware/isLoggedIn');

const categoryRouter = require('express').Router();

categoryRouter.post('/createcategory', isLoggedIn, createCategory);
categoryRouter.get('/allcategory', getAllCategory);
categoryRouter.get('/category/:id', getCategoryById);
categoryRouter.put('/updatecategory/:id',isLoggedIn, updateCategory);
categoryRouter.delete('/updatecategory/:id',isLoggedIn, deleteCategory);

module.exports = categoryRouter;