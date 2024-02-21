const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    orders: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Order'
        }
    ],
    wishlists: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Wishlist'
        }
    ],
    isAdmin: {type: Boolean, default: false},
    hasShippingAddress: {type: Boolean, default: false},
    shippingAddress: {
        firstname: {type: String},
        lastname: {type: String},
        address: {type: String},
        city: {type: String},
        state: {type: String},
        pincode: {type: Number},
        phone: {type: String}
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);


module.exports = {
    User
}