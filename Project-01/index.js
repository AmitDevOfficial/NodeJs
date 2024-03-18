const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose  = require("mongoose");
const app = express();
const port = 8000;


//Connect to the MongoDb DataBase--
mongoose.connect("mongodb://127.0.0.1:27017/myData-1")
.then(() => console.log("MonogDb Connected"))
.catch(error => console.log("Mongo Error", error));

//Schema -- Define Structure--
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    }, 
    lastName: {
        type: String
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    gender:{
        type: String
    },
    jobTitle:{
        type: String
    }
},{ timestamps: true })

const User = mongoose.model("user", userSchema);

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
app.get("/users", async (req, res) => {
    const allDBusers = await User.find({});
    const html = `
    <style>
    th,td{
        padding:1rem;
    }
    </style>
        <center><h1>Employee List</h1>
        <table border="1px" style="border-collapse: collapse;">
        <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Gender</th>
            <th>JobTitle</th>
        </tr>
        ${allDBusers.map((user) => 
            `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.jobTitle}</td>
            </tr>
        `).join("")}
        
        </table></center>
    `
    res.send(html);
})


//Rest 
app.get("/api/users", async(req, res) => {
    const allDBusers = await User.find({});
    return res.json(allDBusers);
})



//Showing users with id :--
app
    .route("/api/users/:id")
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id);
        if(!user) return res.status(404).json({error: "Oops..!!! User not found"});
        return res.json(user);
    })
    .patch(async(req, res) => {
        //Edit user with id
        await User.findByIdAndUpdate(req.params.id, { lastName: "changed"});
        return res.json({ status: "Users update successfully"});
    })
    .delete(async(req, res) => {
        //Delte user with id
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "Sucess = User Delted SuccessFully" });
    })



app.post("/api/users", async(req, res) => {
    const body = req.body;
    // console.log("Body",body);
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json( {msg: "All field are required"})
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });
    console.log("User can be created", result);

    return res.status(201).json({msg : "Success = User can be creted"})

    // users.push({...body, id: users.length + 1});
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data) =>{
    //     return res.status(201).json({ status: "Success -- ", id: users.length });
    // });
});


app.listen(port, () => console.log(`Server Started..!! ${port}`));