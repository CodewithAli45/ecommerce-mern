const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String, required: true},
    category: {
        type: String, 
        ref: 'Category',
        required: true
    },
    sizes: {
        type: [String],
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    colors: {
        type: [String], 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    images: [
        {
            type: String,
            default: "https://via.placeholder.com/150"
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    
    price: {type: Number, required: true},
    totalQty: {type: Number, required: true},
    totalSold: {type: Number, required: true, default: 0},

}, {timestamps: true, toJSON: {virtuals: true}})

const Product = mongoose.model('product', productSchema);

module.exports = Product;
