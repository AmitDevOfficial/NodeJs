const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs")

const app = express();
const port = 8000;

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
app.get("/users", (req, res) => {
    const html = `
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
        ${users.map((user) => 
            `<tr>
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
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
app.get("/api/users", (req, res) => {
    return res.json(users);
})



//Showing users with id :--
app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if(!user) return res.status(404).json({error: "Oops..!!! User not found"});
        return res.json(user);
    })
    .patch((req, res) => {
        //Edit user with id
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        //Delte user with id
        return res.json({ status: "Pending" });
    })



app.post("/api/users", (req, res) => {
    const body = req.body;
    // console.log("Body",body);
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json( {msg: "All field are required"})
    }
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data) =>{
        return res.status(201).json({ status: "Success -- ", id: users.length });
    });
});




app.listen(port, () => console.log(`Server Started..!! ${port}`));