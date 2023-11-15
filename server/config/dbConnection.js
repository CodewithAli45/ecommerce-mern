const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL;

const dbConnection = async () => {
    try {
        const connected = await mongoose.connect(url);
        console.log("connected to mongodb at ", connected.connection.host);
    } catch (error) {
        console.log('error in connecting to db', error.message);
        process.exit(1);
    }
}

module.exports = {
    dbConnection
}