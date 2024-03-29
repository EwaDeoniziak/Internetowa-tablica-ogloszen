const jwt = require('jsonwebtoken');
var private_key = 'ssssscfvdxbfdbf';

module.exports = function auth(req,res,next) {
    const token = req.header('token');
    if(!token) return res.status(401).send('Access denied');

    try{
        const verified = jwt.verify(token, private_key);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

