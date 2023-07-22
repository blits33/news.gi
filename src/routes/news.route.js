import express from 'express'
const route = express.Router()
import { create,findAll,topNews,
    findbyId,searchByTitle, 
    findbyUser,update,erase,likes,addComment,deleteComment,remover,sla,findcomment } from '../controllers/news.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

route.post("/",authMiddleware,create)
route.get("/",findAll)
route.get("/top",topNews)
route.get("/achar",sla)

route.get("/search",searchByTitle)

route.get("/byUser",authMiddleware,findbyUser)
 
route.delete("/:id",authMiddleware ,erase)
route.patch("/likes/:id",authMiddleware ,likes)

route.patch("/:id",authMiddleware ,update)



route.delete("/remover/:id" ,remover)
route.get("/findcomment/:id",findcomment)
route.patch("/comment/:idNews/:idComment",authMiddleware ,deleteComment)
route.patch("/comment/:id",authMiddleware ,addComment)
route.get("/:id",findbyId)
export default route