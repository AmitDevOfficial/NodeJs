// const sessionIdToUserMap = new Map(); //-----------For sesseionId with stateFull Authetication
const jwt = require("jsonwebtoken"); //----------For Jwt Token with stateLess Authetication
const secret = "Amit@7974$"
function setUser(user) {
    // sessionIdToUserMap.set(id, user); //----For StateFull
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret)
}

function getUser(token) {
    // return sessionIdToUserMap.get(id); //----For StateFull
    if(!token) return null;
    return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser
}