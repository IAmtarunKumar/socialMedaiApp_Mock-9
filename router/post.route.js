const express = require("express")
const {PostModel} = require("../model/post.model")
const { auth } = require("../config/auth.middleware.js/auth.middleware")
const postRotuer = express.Router()


// get all posts  

postRotuer.get("/api/posts" , async(req,res)=>{
    try {
        let allPostsData = await PostModel.find()
        res.status(200).send(allPostsData)
    } catch (error) {
        console.log(error)
    }
})

//post get by id 

postRotuer.get("/api/posts/:id" , async(req,res)=>{
    let id =req.params.id
    try {
        let allPostsData = await PostModel.find({_id : id})
        res.status(200).send(allPostsData)
    } catch (error) {
        console.log(error)
    }
})



//post is posted
postRotuer.post("/api/posts",auth , async(req,res)=>{
    let payload = req.body
    console.log(payload)
let in_userid = payload.inuser 
console.log(in_userid)

payload.user = in_userid
    try {
       let post = new PostModel(payload)
       await post.save()

        res.status(201).send({msg : "Posted Succsefully"})
    } catch (error) {
        console.log(error)
    }
})

// post updated

postRotuer.patch("/api/posts/:id" ,auth, async(req,res)=>{
    let id = req.params.id
    let payload = req.body
    try {
     let updataData = await PostModel.findByIdAndUpdate({_id : id} , payload)
     res.status(204).send({msg : "post updated"})
    } catch (error) {
        console.log(error)
    }
})

//delete posts
postRotuer.delete("/api/posts/:id" ,auth, async(req,res)=>{
    let id = req.params.id
 
    try {
     let updataData = await PostModel.findByIdAndDelete({_id : id})
     res.status(202).send("post is deleted")
    } catch (error) {
        console.log(error)
    }
})

//like by users
postRotuer.post("/api/posts/:id/like" ,auth,async(req,res)=>{
    let id = req.params.id
    let payload = req.body
    let in_userid = payload.inuser 

    payload.user = in_userid
    try {
      let userData = await PostModel.findOne({_id : id})
console.log(userData)
      allLikedUser = userData.likes
    //   console.log(allLikedUser)
      allLikedUser.push(in_userid)

      await PostModel.findByIdAndUpdate({_id : id} , userData)

        res.status(200).send({msg : "liked"})
    } catch (error) {
        console.log(error)
    }
})


//like by users
postRotuer.post("/api/posts/:id/comment" ,auth,async(req,res)=>{
    let id = req.params.id
    let payload = req.body
    let in_userid = payload.inuser 
    let commentObj = {
        user : in_userid,
        text : payload.text,
        createdAt : payload.createdAt
    }
    try {
      let userData = await PostModel.findOne({_id : id})

      allCommentedUser = userData.likes
      allCommentedUser.push(commentObj)

      await PostModel.findByIdAndUpdate({_id : id} , userData)

        res.status(200).send({msg : "Commented"})
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    postRotuer
}