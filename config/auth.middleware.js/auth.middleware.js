
const jwt = require("jsonwebtoken")
let auth = (req,res,next)=>{
 
    let token = req.headers.authorization
  
    var decoded = jwt.verify(token, 'masai');
//    console.log(decoded)
   if(decoded){
    req.body.inuser = decoded
    // console.log(req.body)
    next()
   }else{
    res.status(401).send({msg : "Please login first"})
   }
}


module.exports={
    auth
}