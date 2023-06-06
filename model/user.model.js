const mongoose = require("mongoose")


//schema  

const userSchema = mongoose.Schema(
    {
  
        name: String,
        email: String,
        password: String,
        dob: Date,
        bio: String,
        posts: [{ type: String, ref: 'Post' }],
        friends: [{ type: Object, ref: 'User' }],
        friendRequests: [{ type: Object, ref: 'User' }]
      }

)


const UserModel = mongoose.model("User" , userSchema)

module.exports = {
    UserModel
}