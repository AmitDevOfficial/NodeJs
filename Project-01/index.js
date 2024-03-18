const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose  = require("mongoose");

const app = express();
const port = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/info")
.then(() => console.log("MongoDb Connected"))
.catch(error => console.log('MongoDb error', error));

//Creating Schema--
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String
    },
    jobTitle:{
        type: String
    }
})

//Creating Schema as Model--
const User = mongoose.model('user',userSchema);
console.log(User)
//Express MiddleWare - Plugin
app.use(express.urlencoded({ extended: false}));

//creating Own MiddleWare --
app.use((req, res, next) =>{
    fs.appendFile("log.txt",`\n${Date.now()}: ${req.method}: ${req.path}`,(err, data) =>{
        next();
    })
    // res.send("Hey I am MiddleWare 1")
})



//Routes

// app.get("/users", (req, res) => {
//     const html = `
//         <ul>
//             ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//         </ul>
//     `
//     res.send(html);
// })





//Show all user list with HTML Elements :--
app.get("/users", async(req, res) => {
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
})


//Rest 
app.get("/api/users", async(req, res) => {
    const user = await User.find({});
    return res.json(user);
})



//Showing users with id :--
app
    .route("/api/users/:id")
    .get(async(req, res) => {
        const user = await User.findById(req.params.id)
        // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id);
        if(!user) return res.status(404).json({error: "Oops..!!! User not found"});
        return res.json(user);
    })
    .patch(async(req, res) => {
        //Edit user with id
        await User.findByIdAndUpdate(req.params.id, {lastName: "Vishwakarma"})
        return res.json({ status: "Succes = User updated SuccessFully" });
    })
    .delete(async(req, res) => {
        //Delte user with id
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "Success = User Delted Successfully" });
    })



app.post("/api/users", async(req, res) => {
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
    // users.push({...body, id: users.length + 1});
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data) =>{
    //     return res.status(201).json({ status: "Success -- ", id: users.length });
    // });
});


app.listen(port, () => console.log(`Server Started..!! ${port}`));