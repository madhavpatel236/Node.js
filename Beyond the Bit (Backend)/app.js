 const express = require("express")
 const app = express();


 app.use('/madhav', (req,res) => {
   res.send("Madhav")
 });

 app.use("/karavadiya", (req,res) => {
   res.send("Karavadiya")
 });

 app.use("/", (req,res) => {
   res.send("Hello from server!")
 });

 app.listen(1818, () => {
    console.log('server is succesfully made at port 1818')
 })