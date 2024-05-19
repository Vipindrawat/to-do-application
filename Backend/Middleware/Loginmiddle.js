const jwt = require('jsonwebtoken');
let JWT_secret = "mynamei$#sname"

const Authmiddle = (req, res, next) => {
    //Get the user from jwt token and add id to req object--
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ "error": "Please authenticate using token" });
    }
    try {
        const payload = jwt.verify(token, JWT_secret);
        req.user = payload;

    } catch (error) {
        res.status(401).json({ "error": "Please authenticate using token" });
    }
    next();
}

module.exports = Authmiddle;