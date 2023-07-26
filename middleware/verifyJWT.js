// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers['authorisation'] || req.headers['Authorization'];
//     if(!authHeader) return res.status(401);
//     console.log(authHeader); //Bearer token
//     const token = authHeader.split(' ')[1];
//     console.log('Token:', token);
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if(err) {
//                 console.error('Token Verification Error:', err);
//                 return res.sendStatus(403); 
//             }//Invalid
//             req.user = decoded.username;
//             next();
//         }
//     );
// }

// module.exports = verifyJWT;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    //['Authorization'] || req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401).json({ error: 'Authorization header missing.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Bearer token missing.' });
    }

    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    } catch (err) {
        console.error('Token Verification Error:', err);
        res.status(403).json({ error: 'Invalid token.' });
    }
};

module.exports = verifyJWT;
