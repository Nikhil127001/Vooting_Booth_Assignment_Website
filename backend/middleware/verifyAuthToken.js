const jwt = require("jsonwebtoken")
require('dotenv').config();
require('cookie-parser')


const verifyIsLoggedIn = (req, res, next) => {
    
    try {
        const token = req.headers.access_token;
        if(!token) {
           return res.status(403).send("A token is required for authentication") 
        }

        try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        } catch (err) {
          return res.status(401).send("Unauthorized. Invalid Token")  
        }

    } catch(err) {
        next(err)
    }
}

const verifyIsAdmin = (req, res, next) => {
    
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        return res.json({
            message : "Unauthorized. Admin required"
        })
}}
const verifyIsSuperAdmin = (req, res, next) => {
    
    if(req.user && req.user.isSuperAdmin) {
        next()
    } else {
        return res.json({
            message : "Unauthorized. SuperAdmin required"
        })
    }
}

module.exports = { verifyIsLoggedIn, verifyIsAdmin, verifyIsSuperAdmin }