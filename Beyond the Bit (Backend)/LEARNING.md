
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

### NOTES: for readind the data from the database and use outside from the database we need to change the data from `JSON to the Javascript Object`, for that Express give us a express.json(). so for apply for all the route we use them like a `app.use(express.json())`  

- ( 2 ) Make a /user

  - for fetch the data from the database we make a GET API /user.

  - In this API, first of all we can find the request arguments like emailID, firstName ext. for that we use the `req.body.emailID`.

  - Now for find that perticular user from the database we use the `Model.findOne()`

    ``` js
        const userFind = await User.findOne({ emailID: userEmail })
    ```

  - Now we check the conditions like,

    ```js
        if (!userFind) {
        res.status(404).send("User not found!!")
        } else {
        res.send(userFind)
        }
    ```

- ( 3 ) Make a /feed

  - This is a same as a /user but the key difference is to use the `Model.find()` instsand of Model.findOne({ Model : findind_user_paramet })

  - here in Model.find() we cannot pass any argument because we need all the data.

- (4, 5) make a /user delete and update API in a same way.

- (4) add validators (schematype) in the DB level as well in the API level
- add a custome validator function
- add timestamp
- api level validation in the patch req
- use the validator npm for check the email formate and url formate
- NEVER TRUSET req.body

/signup POST:

- add the validation in the /signup POST
- add the password encryption with the help of the  bcrypt
- add the encrypted password in the DB.

/login POST:

- check the emailID present in the DB or not
- Now we check the password is correctfor that perticular user

- ## Cookies and JWT Tokens

- #### Cookies

    - Cookies are simple, small files/data that are sent to client with a server request and stored on the client side. Every time the user loads the website back, this cookie is sent with the request. This helps us keep track of the user’s actions.
    - Now for use the cookies in the Express we need to use the `npm package cookieparser`.

        ``` js
         const cookieparser = require('cookieParser')
         app.use(cookieparser()) 
        ```

    - We use the cookieParser simplly like that because we want that this property apply for all the APIs.

    - The primary function of cookie-parser is to automatically parse incoming cookies from HTTP requests. This means you don't have to manually extract and decode cookie data from the request headers.

        ``` js
        res.cookie(name, 'value', { property }); // Here name is a Tokan name and value is a token value which we need to pass, property is a some property which we give to the cookies like '{expire: 360000 + Date.now()}' or more.
        ```

- #### JWT: JsonWebToken

    - Now for generating the token we use the npm package which is JWT(JsonWebToken).

    - With the use of the JWT tokens we have a key like this,  

    - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`.`eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ`.`cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ`

    - JWT token basically divided into 3 parts,
        - (1) HEADER :
    
        ``` js
            {
                "alg": "HS256",
                "typ": "JWT"
            }
        ```
    
        - (2) PAYLOAD:
    
        ``` js
            {
                "sub": "1234567890",
                "name": "John Doe",
                "iat": 1516239022
            }
        ```
        - (3) VERIFY SIGNATURE: 
         
        ``` js
                HMACSHA256(
                    base64UrlEncode(header) + "." +
                    base64UrlEncode(payload),
                    your-256-bit-secret
                ) secret base64 encoded
        ```

    - Now we see that how we make a JWT tokens,

        ``` js
            var jwt = require('jsonwebtoken');
            var token = jwt.sign({_id : presentUser._id}, 'Madhav@123' , );
            // jwt.sign({ data: 'foobar'}, 'secret', { expiresIn: '1h' }); 
            // _id = paylode or secreat info and suppose Madhav@123 = private key

        ```

    - 
