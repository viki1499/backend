import express from "express";
const app = express();
const port = 5000;


app.get("/",(req,res)=>{
    res.send("Success!!");
})

app.listen(port, ()=>{
    console.log("Port Started");
})