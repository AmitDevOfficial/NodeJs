const User = require("../models/user");
const { v4: uuidv4 } = require("uuid")
const { setUser } = require("../serviceUtil/auth")

async function handelUserSignUp(req,res) {
    // console.log(req)
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/")
}

async function handelUserLogin(req,res) {
    // console.log(req)
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
        password
    });
    if(!user)
        return res.render("login", {
            error: "Invaild Email ID and Password",
        })
    
    /*
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId)
    return res.redirect("/")
    */ //----For Session StateFull

    const token = setUser(user);
    // console.log(token);
    res.cookie("token", token);
    return res.redirect("/");    //-------For JWT Token
}

module.exports = {
    handelUserSignUp,
    handelUserLogin
}