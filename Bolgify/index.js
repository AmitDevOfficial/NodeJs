const path = require("path")
const express = require("express");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user");
const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/blogify").then((e) => console.log("MongoDB Connected"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    return res.render("home")
})

app.use("/user", userRouter)

app.listen(PORT, () => console.log("Server Started on Port", PORT));