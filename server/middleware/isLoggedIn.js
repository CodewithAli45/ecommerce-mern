const verifytoken = require("../util/verifytoken");

const isLoggedIn = (req, res, next) => {
    try {
        const decodedId = verifytoken(req);
        req.userAuthId = decodedId?.id;
        next();

    } catch (error) {
        return res.json({
            message: "Error in validating Token / expired token",
            error: error.message
        })
    }
}

module.exports = isLoggedIn;