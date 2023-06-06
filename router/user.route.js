const express = require("express")
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model")
const jwt = require("jsonwebtoken");
const { auth } = require("../config/auth.middleware.js/auth.middleware");
const userRouter = express.Router()



userRouter.post("/api/register" , (req,res)=>{
    const payload = req.body
    const {password} = req.body
    try {

        bcrypt.hash(password, 8, async(err, hash)=> {
           payload.password=hash
            let user = new UserModel(payload)
            await user.save()

            res.status(201).send({msg : "User Registerd"})
        });

        
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


// login route 

userRouter.post("/api/login" , async(req,res)=>{

    let {email,password} = req.body

    try {
     
    let user = await UserModel.findOne({email})
    console.log(user ,password)
    if(email){
        bcrypt.compare(password, user.password, async(err, result)=> {
           if(result){
            var token = jwt.sign({ userId: user._id }, 'masai');

            res.status(201).send({msg : "User Login succsefully" , token : token})
           }else{
            res.status(401).send(err)
            console.log(err)
           }
        });
    }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


//show all the users

userRouter.get("/api/users" , async(req,res)=>{

  
   
    try {
        let data = await UserModel.find()
    
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
      
    }
})


//get all the friend

userRouter.get("/api/users/:id/friends" ,async (req,res)=>{
    let id = req.params.id

    

try {
    let user = await UserModel({_id : id})
    res.status(200).send(user.friends)
} catch (error) {
    console.log(error)
}

  
})

//send friend request to other person

userRouter.post("/api/users/:id/friends" ,auth , async (req,res)=>{
    let id = req.params.id
    let userId = req.body.inuser
    // console.log(payload.userId)
    console.log(userId)
    

try {
    let user = await UserModel.findOne({_id : id})
    let NewData = user.friendRequests
    NewData.push({userId})

    // console.log(NewData)
  let data =   await UserModel.findByIdAndUpdate({_id : id},user)
    res.status(200).send({msg : "send friend request"})
} catch (error) {
    console.log(error)
}

  
})


//friend upadated patch/put



module.exports={
    userRouter
}