const jwt = require('jsonwebtoken');

const verifytoken = (req, res) => {
    const authHeaders = req.headers.authorization;
    if(!authHeaders){
        return res.json({
            message: "Unauthorized: Missing Token"
        })
    }
    const token = authHeaders.split(' ')[1];
    try {
        const decoded =  jwt.verify(token, process.env.TOKEN_KEY);
        return decoded
    } catch (error) {
        return res.json({
            message: "Failed Token validation",
            error: error.message
        })
    }
    
}

module.exports = verifytoken;