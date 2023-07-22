import {createService,findAllService,
    countNews,topNewsService,findbyIdService,
    searchByTitleService,findbyUserService, 
    updateService,eraseService,
    likenewsService,
    deleteLikesService,addCommentService,
    deleteCommentService,
    removerService,
    achar,
    findcommentService

} from '../services/news.service.js'
import { ObjectId } from 'mongoose'
const create = async (req,res)=>{
   try {
    const {title,text,banner}= req.body

    if(!title || !text || !banner){
            res.status(404).send({message:"submit all fields"})
        }

    const tra = await  createService({title,text,banner,user: req.user})
    
    res.send(tra)


   } catch (error) {
    res.status(500).send(error.message)
}


}
export {create}


    const findAll = async (req,res) =>{
        let {limit,offset} = req.query
        limit = Number(limit)
        offset = Number(offset)
        const currentUrl = req.baseUrl
        
        if(!limit){
            limit = 5
        }
        if(!offset){
            offset = 0
        }
        const news = await findAllService(limit,offset)
       
        const next = offset + limit
        const total = await countNews()
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}`:null
       const previous = offset - limit <0 ? null:offset - limit
       const previousUrl = previous !=null ? `${currentUrl}?limit=${limit}&offset=${previous}`:null
        if(news.length === 0 ){
            return res.status(404).send({message: "no news "})
        }
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar
                
                
            }))
    })
    
    }
export{findAll}


const topNews =async (req,res)=>{
    try {
        const news = await topNewsService()
      if(!news){
        return res.status(404).send({message: "There is no registered post" })
   }

   res.send({
    news:{
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        nome: news.user.name,
        username: news.user.username
    }
   })
        
    } catch (error) {
        res.status(500).send({mesage: error.message})
        
    }
   
}
export {topNews}

const findbyId =async (req,res)=>{
    const {id} = req.params

    const news = await findbyIdService(id)
     if(!news){
        return res.status(404).send({message: "There is no registered post" })
     } 
     return res.send({
        news:{
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            userName: news.user.username,
            userAvatar: news.user.avatar,
            user_id:news.user._id
          
            
        }
     })
}
export {findbyId}

const searchByTitle = async (req,res)=>{
  const {title} = req.query
  const news = await searchByTitleService(title)
  if(news.length === 0 ){
    return res.status(404).send({message: "no news with this title "})
}
res.send({
    results: news.map(item => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar
        
        
    }))
        
    }
 )}

export {searchByTitle}


const findbyUser = async(req,res)=>{

    try{
  const id = req.user
  const news = await findbyUserService(id)

   return res.send({
    results: news.map(item => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        user_id: item.user._id
        
        
    }))
  })}
  catch (error) {
    res.status(500).send({mesage: error.message})
    
}
}
export {findbyUser}

const update = async (req,res)=>{
  try{
    const {title,text,banner} = req.body
    const {id} = req.params



    if(!title && !text && !banner){
        res.status(404).send({message:"submit at least onde field"})
    }
    const news = findbyIdService(id)


    await updateService(id,title,text,banner)
     res.send({message:"You updated this post "})}
     catch(error)
     {
        res.status(400).send(error.message)
     }
}
export {update}

const erase = async(req,res) =>{
    const {id} = req.params
    
   
  
    
    await eraseService(id)
    return res.send({message:"you deleted this post"})
    
}
export {erase}


const likes = async (req,res) =>{
    const {id} = req.params
    const userId = req.user
    const newsLike = await likenewsService(id,userId)
    if(newsLike){
     res.send("ok")}
    if(!newsLike){
        await deleteLikesService(id,userId)
        return res.status(200).send({message: "You removed your like"})
    }
    
}
export {likes}


const addComment =async (req,res) =>{
    const {id} = req.params
    const userId = req.user
    const comment = req.body

    if(!comment){
        return res.status(404).send({message:"Write a message to comment"})
    }
    if(comment){
     await addCommentService(id,userId,comment)
     return res.send({message:"You added a comment"})}
}
export {addComment}




const deleteComment = async (req,res)=>{
   const userId = req.user
   const {idNews,idComment} = req.params
  const deleteComment=  await deleteCommentService(userId,idNews,idComment)
  res.send({message:"Comment was removed "})
 
 
}
  

export {deleteComment}


const remover = async(req,res)=>{
    const {id} = req.params
    const removeu = await removerService(id)
    res.send({message:"remove por favor"})

}
export {remover}

const sla =async (req,res)=>{
    
   const users = await achar()
   res.send(users)
}
export {sla}

const findcomment = async (req,res)=>{
    const {id}= req.params
    const achei = await findcommentService(id)

    res.send(achei)


}
export {findcomment}