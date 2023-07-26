const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({username: user}).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accesstoken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1m'}
        );
        const refreshtoken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        //Saving refreshToken with current user
        foundUser.refreshToken = refreshtoken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshtoken, {
            httpOnly: true,
            sameSite: 'None',
            //secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accesstoken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };