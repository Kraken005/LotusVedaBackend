const User = require('../models/Users');

const handleLogout = async (req, res) => {
    //On client, delete the accesstoken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    //s refreshToken present
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie('jwt', {
            httpOnly: true, 
            sameSite: 'None', 
            //secure: true
        });
        return res.sendStatus(204); //Forbidden 
    }
    //Delete refreshtokens
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', {httpOnly: true});
    res.sendStatus(204);
}

module.exports = {handleLogout};