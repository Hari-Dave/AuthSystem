const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in DB?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(403);
    } 
    
    // Delete refreshToken in DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure : true in production -> only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout };