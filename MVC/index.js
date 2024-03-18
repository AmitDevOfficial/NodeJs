const express = require("express");
const {connectMongoDb} = require("./connection")
const {logReqRes} = require("./middlewares")
const userRouter = require("./routes/user")

const app = express();
const port = 8000;


//Connections--
connectMongoDb("mongodb://127.0.0.1:27017/info")
  .then(() => {
    console.error("MongoDB Connected:");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });




//Express MiddleWare - Plugin
app.use(express.urlencoded({ extended: false}));
//creating Own MiddleWare --
app.use(logReqRes("log.txt"));


//Routes--
app.use("/", userRouter)

app.listen(port, () => console.log(`Server Started..!! ${port}`));