const fs = require("fs");

// fs.writeFileSync("./text.txt","Hey i am Amit Vishwakarma");

// fs.writeFile("./text.txt","hello java",(err) => {});

const result = fs.readFileSync("./text.txt","utf-8");
console.log(result);


// const contact = fs.readFileSync("./contact.txt","utf-8");
// console.log(contact);


// fs.readFile("./contact.txt","utf-8",(error, result)=>{
//     if(error){
//         console.log("Error file is not found");
//     }else{
//         console.log(result);
//     }
// })

// fs.appendFileSync("./contact.txt",`${Date.now()} Hello baby\n`);

// fs.copyFileSync("./contact.txt","./Amit.txt");
// fs.unlinkSync("./contact.txt");
// console.log(fs.statSync("./Amit.txt"))



