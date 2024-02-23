const express = require('express');
const {dbConnection} = require('../config/dbConnection');
const { userRouter } = require('../routes/userRoutes');
const { notFoundError } = require('../middleware/globalErrHandler');
const { productRouter } = require('../routes/productRoutes');
const categoryRouter = require('../routes/categoryRoutes');

const app = express();
app.use(express.json());
dbConnection();

app.use('/api/v1/user', userRouter);

app.use('/api/v1/product', productRouter);

app.use('/api/v1/category', categoryRouter);

app.use(notFoundError);
module.exports = app;