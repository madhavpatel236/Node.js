const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require('./models/user')

app.post("/signup", async (req,res) => {
  const userObj = {
    firstName: "Madhav",
    lastName: "Karavadiya",
    emailID: "madhav@karavadiya.com",
    password: "madhav@123"
  }

  // creating a new instance of the User model
  const user = new User(userObj) 

  await user.save()
})



connectDB()
.then(()=>{
  console.log("Database connection established... ")
  app.listen(1818, () => {
    console.log('server is succesfully made at port 1818')
  })
})
.catch((err) => {
  console.log("Some err occure when database connection establish.")
})


