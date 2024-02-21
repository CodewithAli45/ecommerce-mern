const express = require('express');
const {dbConnection} = require('../config/dbConnection');
const { userRouter } = require('../routes/userRoutes');
const { notFoundError } = require('../middleware/globalErrHandler');
const { productRouter } = require('../routes/productRoutes');

const app = express();
app.use(express.json());
dbConnection();

app.use('/api/v1/user', userRouter);

app.use('/api/v1/product', productRouter);

app.use(notFoundError);
module.exports = app;