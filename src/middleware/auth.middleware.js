import jwt, { decode } from 'jsonwebtoken'
import dotenv from "dotenv"
import userService from "../services/user.service.js"

dotenv.config()

export const authMiddleware = (req,res,next) =>{
   try {
    const {authorization} = req.headers
  

    console.log(authorization)

    if(!authorization){
        res.status(401)
    }

    const parts = authorization.split(" ")
    const [schema,token] = parts
    if(schema != "Bearer"){
        res.status(401)
    }
    console.log(parts)
    if(parts.length != 2){
        res.status(401)
    }
    

      jwt.verify(token,process.env.SECRETE_JWT,async(error,decoded)=>{
        if(error){
           return res.status(401).send({message: "token invalid"})
        }
        console.log(decoded)
        const user = await userService.findbyIdService(decoded.id)
        if(!user || !user.id){
            res.status(401).send({message: "Token invalid"})
      
      }
      console.log(user)
      req.user = user._id
      return next()})

        
   }
      
    
    catch (error) {
       return res.status(500).send(error.message)
   }   
   }
