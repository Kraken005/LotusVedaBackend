// const usersDB = {
//     users: require('../models/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const handleRefreshToken = (req, res) => {
//     // console.log('Request Headers:', req.headers);
//     // console.log('Cookies:', req.cookies);
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(401).json({"error": "Error is here"});
//     //console.log(cookies.jwt);
//     const refreshToken = cookies.jwt;

//     const foundUser = usersDB.users.find(person => person.refreshtoken === refreshToken);
//     if (!foundUser) return res.sendStatus(403); //Forbidden 
//     // evaluate jwt 
//     // try {
//     //     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
//     // } catch (error) {
//     //     console.error('Token Verification:', error)
//     // }
//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         (err, decoded) => {
//             // if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
//             // if (err) {
//             //     console.error('Token Verification Error:', err);
//             //     return res.sendStatus(500); // Internal Server Error or any other appropriate error status
//             // }
    
//             // if (foundUser.username !== decoded.username) {
//             //     return res.sendStatus(403); // Forbidden (invalid token)
//             // }
//             if (err) {
//                 if (err.name === 'TokenExpiredError') {
//                     return res.status(401).json({ error: 'Token has expired.' });
//                 } else {
//                     console.error('Token Verification Error:', err);
//                     return res.status(500).json({ error: 'Internal Server Error.' });
//                 }
//             }
//             // console.log(foundUser.username);
//             // console.log(decoded.username);
    
//             if (foundUser.username !== decoded.username) {
//                 return res.status(403).json({ error: 'Invalid token for this user.' });
//             }
//             const accessToken = jwt.sign(
//                 { "username": decoded.username },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '30s' }
//             );
//             res.json({ accessToken });
//         }
//     );
// }

// // const handleRefreshToken = (req, res) => {
// //     const refreshToken = req.cookies.jwt;

// //     if (!refreshToken) {
// //         return res.sendStatus(401); // Unauthorized
// //     }

// //     const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
// //     if (!foundUser) {
// //         return res.sendStatus(403); // Forbidden
// //     }

// //     // The refresh token is valid, proceed to create a new access token
// //     const accessToken = jwt.sign(
// //         { "username": foundUser.username },
// //         process.env.ACCESS_TOKEN_SECRET,
// //         { expiresIn: '30s' }
// //     );
// //     res.json({ accessToken });
// // };


// // const handleRefreshToken = (req, res) => {
// //     const cookies = req.cookies;
// //     if (!cookies?.jwt) return res.sendStatus(401);
// //     const refreshToken = cookies.jwt;

// //     const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
// //     if (!foundUser) return res.sendStatus(403); // Forbidden
    
// //     // The refresh token is valid, proceed to create a new access token
// //     const accessToken = jwt.sign(
// //         { "username": foundUser.username },
// //         process.env.ACCESS_TOKEN_SECRET,
// //         { expiresIn: '30s' }
// //     );
// //     res.json({ accessToken });
// // }


// module.exports = { handleRefreshToken }
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.sendStatus(401).json({ error: 'Token has expired.' });
                } else {
                    console.error('Token Verification Error:', err);
                    return res.status(500).json({ error: 'Internal Server Error.' });
                }
            }

            if (foundUser.username !== decoded.username) {
                return res.status(403).json({ error: 'Invalid token for this user.' });
            }
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { "UserInfo": {
                    "username": decoded.username,
                    "roles": roles
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            );
            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };
