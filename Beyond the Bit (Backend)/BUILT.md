### in this file i was explained How i was make this project from start to the end.

## (1) Connect the database
- First of all we connect a mongodb database in the `/config/database.`

    ```js
    const mongoose = require("mongoose")
    const connnectDB = async () =>{
        await mongoose.connect(
            "mongodb+srv://Beyond-the-Bit:Fzv7FD0Rn0ehRNKu@beyond-the-bit-cluster.zg6w8.mongodb.net/beyound-the-bits"
        );
    }
    module.exports = connnectDB
    ```

## (2) Make a user model

- Now for save any data in the database we need a some particular formate(like how much fields we need to store)
- For that we make a user Model in our project at `/model/user.`
- In this Model we make a userSchema, this userSchema was contain all the fields which we include in the database if we want but outside from this schema we cannot use any other fileds.

    ```js
    const mongoose = require("mongoose");

    const userSchema = new mongoose.schema({
        firstName: {
            type: string
        },
        lastname: {
            type: string
        },
        emailID: {
            type: string
        },
    })

    const userModel = mongoose.model("User", userSchema);
    module.export = userModel
    ```
    - Here we see that this model and Schema concepts come from the mongooes npm package.
    - firstName, lastName, emailID is a field of the schema or field of the documents.
    - In the mongoose.model("User", userSchema), User is a name of the model which we use any where we want a user Model and userSchema is a schema which we given to that perticular model(User).
- In  this Schema we can directly add some parameters like this is reqired or may be length of the field or many more things.
- Now for check the emailId and ImageURL we directlly use the NPM Package `Validator`
    ``` js 
    npm i validator
    ```