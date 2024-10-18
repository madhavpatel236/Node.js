const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors")

const app = express();

app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));

// convert the incoming data from the JSON which is coming from the database to the Javascript Object.
app.use(express.json());
// The primary function of cookie-parser is to automatically parse incoming cookies from HTTP requests. This means you don't have to manually extract and decode cookie data from the request headers.
app.use(cookieParser());

const authRoute = require('./routers/auth')
const profileRoute = require('./routers/profile')
const requestRoute = require('./routers/request')
const userRouter = require('./routers/user')

app.use("/", authRoute)
app.use("/", profileRoute)
app.use("/", requestRoute)
app.use("/", userRouter)




connectDB()
  .then(() => {
    console.log("Database connection established... ");
    app.listen(1818, () => {
      console.log("server is succesfully made at port 1818");
    });
  })
  .catch((err) => {
    console.log("Some err occure when database connection establish.");
  });

  

// // get the perticuler user details
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailID;
//   console.log(userEmail)
//   try {
//     const userFind = await User.findOne({ emailID: userEmail })

//     if (!userFind) {
//       res.status(404).send("User not found!!")
//     } else {
//       res.send(userFind)
//     }
//   } catch (error) {
//     console.log("error!!!", error)
//   }

// })

// // get the all user details
// app.get("/feed", async (req, res) => {
//   try {
//     const userData = await User.find() // for fetch orget the all data we cannot give any arguments in the find()
//     if (!userData) {
//       res.status(400).send("Data not found")
//     } else {
//       res.send(userData)
//     }
//   } catch (err) {
//     throw new Error('Some error occures ', err.message)
//   }
// })

// // delete the user
// app.delete("/user", async (req, res) => {
//   const userID = req.body.userId

//   try {
//     const deleteUser = await User.findByIdAndDelete(userID)
//     if (deleteUser) {
//       res.send("user deleted successfully!!")
//     } else {
//       res.status(404).send("User not found for the delete them")
//     }
//   } catch (error) {
//     res.status(404).send("Something went wrong!!")
//   }
// })

// // update the user Details
// app.patch("/user/:userId", async (req, res) => {

//   const userID = req.params?.userId
//   const data = req.body
//   // console.log(data)

//   // EX data:
//   // {
//   // "userId": "66fec68b3d7aaaf118d9bde2",
//   // "firstName": "Virat",
//   // "lastName": "Kohli"
//   // "gender": "male",
//   // "skills": ["node", "cricket", "mongooes" ]
//   // }

//   try {
//     // Here we do a API lavel validation like How much access we need to give to the user for edit the information
//     const ALLOWED_UPDATES = ["age", "skills", "about"]
//     const updateIsAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key)) // here we check that user edit data is allowed or not.
//     if (!updateIsAllowed) { // if edit data is not allowed then we send the invalide input otherwise move forverd.
//       res.status(400).send("Invalide input")
//     }
//     if (data?.skills?.length > 50) {
//       throw new Error("skill length increase")
//     }

//     const updateUser = await User.findOneAndUpdate({ _id: userID }, data, { returnDocument: 'before' }) // Here 3rd parameter is "options" for more understanding refer the mongoose documentation > Model > findOneAndUpdate()
//     res.send("User detail updates successfully !!")
//   } catch (error) {
//     res.status(400).send("Something went Wrong!!" + error)
//   }
// })
