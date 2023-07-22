import User from "../modules/User.js"
import jwt from 'jsonwebtoken'


const loginService  = (email) => User.findOne({email: email}).select("+password")
const generateToken = (id)=> jwt.sign({id:id},process.env.SECRETE_JWT,{expiresIn: 86400})


export {loginService,generateToken}