const User = require("../models/user");

async function handelGetAllUsers(req,res){
    const allDbUser = await User.find({});
    const html = `
    <style>th,td{padding:1rem}</style>
        <center><h1>Employee List</h1>
        <table border="1px"  border-collapse: "collapse">
        <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Gender</th>
            <th>JobTitle</th>
        </tr>
        ${allDbUser.map((user) => 
            `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.job_title}</td>
            </tr>
        `).join("")}
        
        </table></center>
    `
    res.send(html);
}

async function handelShowAllUser(req,res){
    const user = await User.find({});
    return res.json(user);
}

async function handelGetUserById(req,res){
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "Oops..!!! User not found"});
    return res.json(user);
}

async function handelPatchById(req,res){
    await User.findByIdAndUpdate(req.params.id, {lastName: "Vishwakarma"})
    return res.json({ status: "Succes = User updated SuccessFully" });
}

async function handelDelteById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success = User Delted Successfully" });
}

async function handelCreateUser(req,res){
    const body = req.body;
    // console.log("Body",body);
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json( {msg: "All field are required"})
    }
    const user = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTile: body.job_title
    })
    return res.status(201).json({msg: "Success = User created successfully"});
}

module.exports={
    handelGetAllUsers,
    handelShowAllUser,
    handelGetUserById,
    handelPatchById,
    handelDelteById,
    handelCreateUser
}