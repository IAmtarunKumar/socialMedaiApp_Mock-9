const mongoose = require("mongoose")


//schema  

const postSchema = mongoose.Schema(
    {
       
        user: { type: Object, ref: 'User' },
        text: String,
        image: String,
        createdAt: Date,
        likes: [{ type: Object, ref: 'User' }],
        comments: [{
          user: { type: String, ref: 'User' },
          text: String,
          createdAt: Date
        }]
      }

)


const PostModel = mongoose.model("Post" , postSchema)

module.exports = {
   PostModel
}