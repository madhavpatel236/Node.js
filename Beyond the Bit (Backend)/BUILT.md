### in this file i was explained How i was make this project from start to the end.

## (1) Connect the database

- First of all we connect a mongodb database at the `/config/database.`

  ```js
  const mongoose = require("mongoose");
  const connnectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://Beyond-the-Bit:Fzv7FD0Rn0ehRNKu@beyond-the-bit-cluster.zg6w8.mongodb.net/beyound-the-bits"
    );
  };
  module.exports = connnectDB;
  ```

## (2) Make a user model and Schema

- Now for save any data in the database we need a some particular formate(like how much fields we need to store)
- For that we make a user Model in our project at `/model/user.`
- In this Model we make a userSchema, this userSchema was contain all the fields which we include in the database if we want but outside from this schema we cannot use any other fileds.

  ```js
  const mongoose = require("mongoose");

  const userSchema = new mongoose.schema(
    {
      firstName: {
        type: string,
      },
      lastname: {
        type: string,
      },
      emailID: {
        type: string,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );

  const userModel = mongoose.model("User", userSchema);
  module.export = userModel;
  ```

  - Here we see that this model and Schema concepts come from the mongooes npm package.
  - firstName, lastName, emailID is a field of the schema or field of the documents.
  - In the mongoose.model("User", userSchema), User is a name of the model which we use any where we want a user Model and userSchema is a schema which we given to that perticular model(User).
  - Now we need to save the time when user enter their data or update their data so we can directly use the timestamps property.

- In this Schema we can directly add some parameters like this is reqired or may be length of the field or many more things.
- Now for check the emailId and ImageURL we directlly use the NPM Package [Validator](https://www.npmjs.com/package/validator).

## (3) Make a APIs

- There are basically 5 types of APIs we generraly used

  (i) POST

  (ii) GET

  (iii) PATCH

  (IV) PUT

  (V) DELETE

- First of all we make a `POST /signup` API.

  ```js

  const app = required("express");
  const User = required("./models/user.js");
  const bcrypt = required("bcrypt)

  app.post("/signup", async (req, res) => {
    try {
      const { firstName, lastName, emailID, password, gender, password } =
        req.body; // from req.body we retrive all the data which is entered by the user.

        const HashPasswordValue = await bcrypt.hase(password, 10)

      const user = new User({
        // Here we use the instance of the User Model.
        firstName,
        lastName,
        emailID,
        password,
        gender,
        password: HashPasswordValue,
      });
      await user.save(); // from the use of the .save() we save the data in the database and this operation always do in the await.
      res.send("Saved the user data successfully!! ");
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });

  ```

  - In the API (req, res) = {... } is called as a request handeler.

    - In the req.body we get a Input which is given by the end user like in this case we have a user details filled by the end user and from the res.body we get a responce of that API if present.

  - So from the help of the req.body we retrive all the data which is given by the end user.

  - Now always save the password in the simple string is not safe so we need to save them in a way that noone can decrypt them.

    - for that we use the one more NPM package [bcrypt](https://www.npmjs.com/package/bcrypt)

    - from that package we make a password Hash which is encrypted or secure.
    - In this package we has a `bcrypt.hase("value", sault_round)` method from which we make a hase value for the password.

  - Now for add this data we need to use the user model because without the use of the user Model our database was massuped with the unwanted data.
    - So for that we make a instance of that userModel, which means that only those data save in the databese which is defined in the userSchema in the userModel.
  - Now for save the data in the database we need to use the `.save()` method which is directly save the instance of the model which is enter by the end user in the database.
    - `REMEMBER: always do a database operation in the async and await.`
  - At the end if data saved in the database then we will send the response with the help of the `res.send()`

  - ### NOTE: In the APIs We always write a login in the try and catch block.

  - Now we make a APIs like POST /login, GET /profile etc.

## (4) Data sanitization and Schema validation.

- `Never Trust req.body directly`

- At the time of the user input we get so many unwantd things also for that we need to do a Data Sanitization.

- There are multiple ways to sanitize a data like at the database level(Schema level) at the end level(In the Backend at the time of submit the data).

- ### Data sanitization at the database level(Schema level)

  - At the database level we add a property like `required, lowercase, trim, default` etc.
  - for that we need to add them in the Model.
  - For the reference refer the [Mongoose Documentation-schema-validation](https://mongoosejs.com/docs/validation.html)

  ```js
  const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      min: 10,
      max: 50,
      default: "This is a default about us of this user",
    },

    skills: {
      type: [],
    },
  });
  ```

- ### Data sanitization at the end (At the time of save the data)

  - Data senitiation and validation do at the end level is a very common things like we make a another folder in which we have a different-different functions to validate a data.
  - In this project i was make a file at `/utils/validator.js`
  - from this method we make a custome validator for our perticular usecases.

  ```js
  const validator = require("validator");
  const signupValidator = (req) => {
    const { firstName, lastName, emailID, password, gender } = req.body;

    if (!firstName || firstName.length > 20) {
      throw new Error("Please enter a valid user name");
    } else if (!lastName || lastName.length > 30) {
      throw new Error("please enter a valid last name");
    } else if (!emailID) {
      throw new Error("please enter a emailID");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("please enter a strong password");
    } else if (gender && !["male", "female", "others"].includes(gender)) {
      throw new Error(
        "please select from a male, female or others gender categories only"
      );
    }
  };

  module.exports = {
    signupValidator,
  };
  ```

## (5) Cookies and JWT tokens

- Cookies are small data that are stored on a client side and sent to the client along with server requests. Cookies have various functionality, they can be used for maintaining sessions and adding user-specific features in your web app.
- Now for use the Cookie we need to use the [Cookie-parser](https://expressjs.com/en/resources/middleware/cookie-parser.html)
- cookie-parser is middleware that simplifies handling cookies. It parses incoming cookies from client requests and makes them accessible in the req. cookies object.
  ```js
  var cookieParser = require("cookie-parser");
  app.use(cookieParser());
  ```
- Let’s say we have a user and we want to add that user data in the cookie then we have to add that cookie to the response using the following code :
  ```js
  res.cookie(name_of_cookie, value_of_cookie);
  ```
- Now in the Cookie we need a token, This token is different for every user. This token is like a temepery password for the user.

- Here in this project for generating the token we use the [jsonWebToken](https://www.npmjs.com/package/jsonwebtoken)

  ```js
  var jwt = require("jsonwebtoken");
  var token = jwt.sign({ _id: currentUser._id }, "Madhav@123"); //  // _id = paylode or secreat info and Madhav@123 = private key
  ```

- this is the the code in which we use the cookies and jwt token in our ptoject.

  ```js
  authRouter.post("/login", async (req, res) => {
    const { emailID, password } = req.body;

    try {
      // check email is present in the DB or not
      const presentUser = await User.findOne({ emailID: emailID });
      if (!presentUser) {
        throw new Error("please enter valid email address!!");
      }
      // check the password
      const isPasswordValid = await presentUser.PasswordValidator(password); // here we directly add a functionality from the user model instand of write here because this is directly locked with the user.
      if (isPasswordValid) {
        // create a JWT token
        const token = jwt.sign({ _id: presentUser._id }, "Madhav@123");

        // add a token to cookies and send the response back to the user from the server.
        res.cookie("token", token); // it is a expressjs property.
        res.send("password Checked");
      } else {
        throw new Error("Invalid password");
      }
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  });
  ```

  - Now for check the cookie is valid or not we get the cookie from the `req.cookies`
  - Here is a example of varify the cookie

  ```js
  const { token } = req.cookie;
  const isValidCookie = await jwt.verify("token", "madhav@123");
  ```
  - for more reference show `/middleware/auth.js`
  - In our project we make a saperate `middleware` for check the cookie is present or not based on that we directly signin the user in the website. 

## (5) Express.Router()

- Before the use of the Express Router we directly add the APIs in the app.js file for the large project we have more than 100 or 1000 APIs in this case this is not a readble or testable so we need to use the [Express.Router()](https://expressjs.com/en/api.html#express.router)

- In This routing technique we make a saperate folder for the APIs in our case we make a `/router`

- Now we seperate the API based on the types based on that we make a seperate files for the types of APIs for understand that refer the [APILIST.md](./APILIST.md) and `/route`  

- In our project we have a auth router for Signup, login and logout process.

- Basic Structure of the router is like that,

  ```js
  const express = required("express")

  const authRouter = express.Router();

  authRouter.post("/signup", (req, res) => {
    // logic
  })
  authRouter.post("/login", (req, res) => {
    // logic
  })
  authRouter.post("/logout", (req, res) => {
    // logic
  })
  module.exports = authRouter;
  ```

- That's How we make a express Router, Now we need to directly use them at the app.js file like that,

  ```js
  const authRouter = required('./router/auth')
  const profilrRouter = required('./routers/profile')

  app.use("/", authRouter);
  app.use("/", profileRouter);
  ```
  - Now js engine check the router one by one start with the authRouter if path not find then check in the profileRouter etc. 