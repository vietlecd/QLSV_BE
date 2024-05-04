// middleware/verifyUser.js
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("Token is missing");
    }

    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.json("Error with token");
        }

        req.user = decoded;
        next();
    });
};

module.exports = verifyUser;