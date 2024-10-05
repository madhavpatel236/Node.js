const express = require("express")
const connectDB = require("./config/database")
const User = require('./models/user')
const { signupValidator } = require("./utils/validator")
const bcrypt = require('bcrypt');
const validator = require("validator")
const app = express();

// convert the incoming data from the JSON which is coming from the database to the Javascript Object.
app.use(express.json())

// send the user details in the database
app.post("/signup", async (req, res) => {

  try {
    const { firstName, lastName, emailID, password, gender } = req.body


    // validate the detail cradentiales
    signupValidator(req);

    // password hash
    const HashPasswordValue = await bcrypt.hash(password, 10) // bcrypt is a library from which we can encrypt our password directly.

    // creating a new instance of the User model
    const user = new User(
      {
        firstName,
        lastName,
        emailID,
        gender,
        password: HashPasswordValue
      }
    ) // Here 'User' is come form the model folder in which we have a user.js and in whcich we have a model User.


    await user.save()
    res.send("Saved the user data successfully!! ")
  }
  catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

// login cranditial check API
app.post("/login", async (req, res) => {

  const { emailID, password } = req.body;

  try {
    // check email is present in the DB or not
    const presentUser = await User.findOne({ emailID: emailID })
    if (!presentUser) {
      throw new Error("please enter valid email address!!")
    }
    // check the password
    const isPasswordValid = await bcrypt.compare(password, presentUser.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password")
    } else {
      res.send("password Checked")
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message)
  }
})


// get the perticuler user details
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;
  console.log(userEmail)
  try {
    const userFind = await User.findOne({ emailID: userEmail })
    if (!userFind) {
      res.status(404).send("User not found!!")
    } else {
      res.send(userFind)
    }
  } catch (error) {
    console.log("error!!!", error)
  }

})

// get the all user details
app.get("/feed", async (req, res) => {
  try {
    const userData = await User.find() // for fetch orget the all data we cannot give any arguments in the find()
    if (!userData) {
      res.status(400).send("Data not found")
    } else {
      res.send(userData)
    }
  } catch (err) {
    console.log('Some error occures ', err.message)
  }
})

// delete the user 
app.delete("/user", async (req, res) => {
  const userID = req.body.userId

  try {
    const deleteUser = await User.findByIdAndDelete(userID)
    if (deleteUser) {
      res.send("user deleted successfully!!")
    } else {
      res.status(404).send("User not found for the delete them")
    }
  } catch (error) {
    res.status(404).send("Something went wrong!!")
  }
})

// update the user Details
app.patch("/user/:userId", async (req, res) => {

  const userID = req.params?.userId
  const data = req.body
  // console.log(data)

  // EX data: 
  // {
  // "userId": "66fec68b3d7aaaf118d9bde2",
  // "firstName": "Virat",
  // "lastName": "Kohli" 
  // "gender": "male",
  // "skills": ["node", "cricket", "mongooes" ]
  // }

  try {
    // Here we do a API lavel validation like How much access we need to give to the user for edit the information 
    const ALLOWED_UPDATES = ["age", "skills", "about"]
    const updateIsAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key)) // here we check that user edit data is allowed or not.
    if (!updateIsAllowed) { // if edit data is not allowed then we send the invalide input otherwise move forverd.
      res.status(400).send("Invalide input")
    }
    if (data?.skills?.length > 50) {
      throw new Error("skill length increase")
    }

    const updateUser = await User.findOneAndUpdate({ _id: userID }, data, { returnDocument: 'before' }) // Here 3rd parameter is "options" for more understanding refer the mongoose documentation > Model > findOneAndUpdate()
    res.send("User detail updates successfully !!")
  } catch (error) {
    res.status(400).send("Something went Wrong!!" + error)
  }
})



connectDB()
  .then(() => {
    console.log("Database connection established... ")
    app.listen(1818, () => {
      console.log('server is succesfully made at port 1818')
    })
  })
  .catch((err) => {
    console.log("Some err occure when database connection establish.")
  })

