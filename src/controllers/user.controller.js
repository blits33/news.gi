import userService from "../services/user.service.js"

const create = async (req,res)=>{
   const {name,username,email,password,avatar,background} = req.body
     
   if(!name || !username || !email 
    || !password || !avatar || !background){
        res.status(404).send({message:"submit all fields"})
    }

    const user = await userService.create(req.body)

    if(!user){
      return  res.status(404).send({message: "user not found"})
    }
   
   res.status(201).send({

    user:{
        id: user._id,
        name,
        username,
        email,
        password,
        avatar,
        background,
    }
   })
}

const findAll = async (req,res) =>{

    const users = await userService.findAllService()

    if(users.length === 0 ){
        return res.status(404).send({message: "no users "})
    }
    res.send(users)
}

    const findbyId = async (req,res)=>{

        const id = req.params.id

        const user = await userService.findbyIdService(id)

        if(!user){
            return  res.status(404).send({message: "user not found"})
          }

          res.status(201).send(user)


    }

    const update = async (req,res) =>{
        const {name,username,email,password,avatar,background} = req.body
     
   if(!name && !username && !email 
    && !password && !avatar && !background){
        res.status(404).send({message:"submit at least one field"})
    }

    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message:"invalid id"})
    }
   const user = await userService.findbyIdService(id)
   if(!user){
    return  res.status(404).send({message: "user not found"})
  }

    await userService.updateService(

    id,name,username,email,password,avatar,background
  )
  res.send({message: "usuário atualizado"})

    }

export default {create,findAll,findbyId,update}