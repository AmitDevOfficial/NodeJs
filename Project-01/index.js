const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs")

const app = express();
const port = 8000;

//Express MiddleWare - Plugin
app.use(express.urlencoded({ extended: false}));

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
        <table style="width:100%" border="1px"  border-collapse: "collapse">
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
        
        </table>
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
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data) =>{
        return res.json({ status: "Success", id: users.length });
    });
});




app.listen(port, () => console.log(`Server Started..!! ${port}`));