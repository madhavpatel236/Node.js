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

  - #### NOTE: In the APIs We always write a login in the try and catch block.

  - Now we make a APIs like POST /login, GET /profile etc.
