import mongoose from "mongoose"
import userService from "../services/user.service.js"


const valid = (req,res,next)=>{
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message:"invalid id"})
    }
    next()

}

const validUser =async (req,res,next)=>{
    const id = req.params.id

    const user = await userService.findbyIdService(id)
    if(!user){
     return  res.status(404).send({message: "user not found"})
   }
 next()

}

export default {valid,validUser}