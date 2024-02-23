const Category = require("../model/Category");

const createCategory = async (req, res) => {
    const {name} = req.body;
    const exitingCategory = await Category.findOne({name});
    if(exitingCategory){
        return res.status(400).json({
            message: "Category already exist"
        })
    }
    try {
        const newCategory = new Category({
            name,
            user: req.userAuthId,
        });
        await Category.create(newCategory);
        res.status(201).json({
            message: "Category created successfully",
            data: {
                newCategory
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}
const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "Fetched all Categories",
            data: {
                categories
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json({
            message: "Fetched all Categories",
            data: {
                category
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    try {
        const existingCateogry = await Category.findByIdAndUpdate(id, name, {new : true});
        if(!existingCateogry){
            return res.status(404).json({
                message: "Category not found"
            })
        }
        await existingCateogry.save();
        res.status(200).json({
            message: "Updated Categories",
            data: {
                existingCateogry
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    const {id} = req.params;
    
    try {
        const existingCateogry = await Category.findByIdAndDelete(id);
        if(!existingCateogry){
            return res.status(404).json({
                message: "Category not found"
            })
        }
        res.status(200).json({
            message: "Deleted Categories",
            data: {
                existingCateogry
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}
module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory, 
    deleteCategory
}