import bcrypt from 'bcrypt'
import {loginService,generateToken} from '../services/auth.service.js'
const login = async (req,res) =>{

    try {
        const {email , password} = req.body
    
       const user = await loginService(email)

      if(!user){
        return res.status(404).send({message: "Invalid password or user"})
      }
       

     const passwordIsValid = 
      bcrypt.compareSync(password,user.password)
      
     

      if(!passwordIsValid){
        return res.status(404).send({message: "Invalid password or user" })
      }

      const token = generateToken(user.id)
      res.send({token})
      console.log(passwordIsValid)
}
        
     catch (error) {
        res.status(500).send(error.message)
    }
}
    
export {login}