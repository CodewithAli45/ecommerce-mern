const jwt = require('jsonwebtoken');
const JWT_SECRETE = process.env.TOKEN_KEY;


const generatedToken = (id) => {
    return jwt.sign({id}, JWT_SECRETE, {expiresIn: "3h"})
}

module.exports = generatedToken;