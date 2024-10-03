
- (1) make a /signup

  - ( I ) first we will connect the cluster and then make a database with the add at the end `/beyound-the-bits` in the connection URIs.

    ```js
    const mongoose = require("mongoose")

    const connnectDB = async () =>{
    await mongoose.connect(
        "mongodb+srv://Beyond-the-Bit:Fzv7FD0Rn0ehRNKu@beyond-the-bit-cluster.zg6w8.mongodb.net/beyound-the-bits"
    );
    }
    module.exports = connnectDB
    ```

  - ( II ) 
    Now we make a Model in which we make a Schema which is the one type of structure which we need to follow for save the data in the database.
    - Here we use the `mongoos.Schema({..})` and `mongoose.model("User", userSchema)` Here User is a Name of the this Model and userSchema is the Schema which we need to follow.
    - If any Type Error occure like here in Schema we use the firstName as a field and at the time of save the data(in the API) we use the UserName then data will not store. 

    ``` js
        const mongoose = require("mongoose")
        const userSchema = mongoose.Schema({
     firstName:{
         type: String
     },
     lastName:{
         type: String
     },
     emailID:{
          type: String
     },
     password:{
         type: String
     },
     age:{
         type: Number
     },
     gender:{
         type: String
     }
     })
     const userModel = mongoose.model("User", userSchema)
     module.exports = userModel;
    ```

  - (III) Now in the third stage we make a connection to the database cluster and then we establish the server.

    ```js
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
    ```

    - After that we make a POST API because we nned to send the data in the database.

    ```js
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

    ```