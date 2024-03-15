// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const myServer = http.createServer((req, res) => {
//     if(req.url === "/favicon.ico") return res.end();
//     const log = `${Date.now()}: ${req.url} New Request recived...\n`;
//     const myUrl = url.parse(req.url,true);
//     console.log(myUrl);
//     fs.appendFile("log.txt", log, (error, data) => {
//         switch (myUrl.pathname) {
//             case "/":
//                 res.end("HomePage");
//                 break;
//             case "/about":
//                 const username = myUrl.query.myname;

//                 res.end(`Hi ${username}`);
//                 break;
//             case "/contact":
//                 res.end("Welcome to contact page");
//                 break;
//             case "/search":
//                 const search = myUrl.query.search_query;
//                 res.end(`Here is the result ${search}`);
//                 break;
//             default:
//                 res.end("404 Not Found");
//                 break;
//         }
//     });
// });

// myServer.listen(8000, () => console.log("Server Started"));




/*------------------Using with Express Js FrameWork------------------*/


const express = require("express");
const app = express();
const port = 8000;

app.get("/",(req,res)=>{
    return res.send ("Hello From Home Page");
})

app.get("/about",(req,res)=>{
    return res.send (`Hello i am about page  ${req.query.name}`);
})

app.listen(port,() => console.log("Server Started..!!"));