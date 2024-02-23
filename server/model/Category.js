const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: mongoose.Schema.ObjectId, ref: "User", required: true},
    images: {type: String, default: "https://pucsum.photos/200/300"},
    product: [{type: mongoose.Schema.ObjectId, ref: "Product"},],
}, {timestamps: true});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
