// In this file we can connect our cluster and make a database for the project.

const mongoose = require("mongoose")

const connnectDB = async () =>{
    await mongoose.connect(
        "mongodb+srv://Beyond-the-Bit:Fzv7FD0Rn0ehRNKu@beyond-the-bit-cluster.zg6w8.mongodb.net/beyound-the-bits"
    );
}

module.exports = connnectDB