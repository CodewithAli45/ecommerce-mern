const express = require('express');
const app = express();
const {dbConnection} = require('../config/dbConnection');

dbConnection();

module.exports = app;