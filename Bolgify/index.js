const path = require("path")
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const mongoose = require("mongoose")
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog")

mongoose.connect("mongodb://localhost:27017/blogify").then((e) => console.log("MongoDB Connected"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

/*------We can use this middleware for showing the image----------*/
app.use(express.static(path.resolve('./public')));


app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", async(req, res) => {
    const allBlogs = await Blog.find({})
    return res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log("Server Started on Port", PORT));