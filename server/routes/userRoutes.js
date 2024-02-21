const express = require('express');
const { userRegister, userLogin, getProfile, userLogout } = require('../controller/userController');
const isLoggedIn = require('../middleware/isLoggedIn')
const userRouter = express.Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.get('/profile', isLoggedIn, getProfile);
userRouter.post('/logout', isLoggedIn, userLogout);


module.exports = {
    userRouter
}