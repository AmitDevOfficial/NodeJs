const User = require("../models/user");

async function handelUserSignUp(req,res) {
    console.log(req)
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render("home")
}

module.exports = {
    handelUserSignUp
}