import { now } from "mongoose";
import News from "../modules/News.js";
const findbyIdService = (id) =>News.findOne({_id:id}).populate("user")
const createService = (body) => News.create(body)
const achar = ()=> News.find().populate("user")
const findAllService = (limit,offset)=> News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")
const countNews = ()=> News.countDocuments()

const topNewsService = () => News.findOne().sort({_id: -1}).populate("user")


const searchByTitleService = (title)=> News.find({title: {$regex: `${title || " "}`
,$options: "i"}}).sort({_id: -1}).populate("user")

const findbyUserService = (id) => News.find({user:id}).sort({_id: -1}).populate("user")

const updateService = (id,title,text,banner)=> News.findByIdAndUpdate({_id: id},{title,text,banner},{rawResult: true})

const eraseService = (id) => News.findOneAndDelete({_id: id})
const likenewsService = (id,userId) => News.findOneAndUpdate({_id:id,"likes.userId": {$nin: [userId]}}, {$push: {likes: {userId,create: new Date()}} })
const deleteLikesService = (id,userId) => News.findByIdAndUpdate({_id:id}, {$pull: {likes: {userId,create: new Date()}} })
const addCommentService = (id,userId,comment) =>{
    let idComment =  Math.floor(Date.now()* Math.random()).toString(30)
    return News.findOneAndUpdate({_id: id},{$push: {comments:{idComment,userId,comment,created: new Date()}}})}




const deleteCommentService = (userId,idNews,idComment) => News.findOneAndUpdate({_id:idNews},{$pull: {comment: {idComment,userId}}})

const removerService = (id)  => News.findOneAndDelete({_id: id})
const findcommentService = (id)=>News.findOne({_id: id})

export  {createService,findAllService,
    countNews,topNewsService,findbyIdService,
    searchByTitleService,
    findbyUserService,updateService,
    eraseService,likenewsService,
    deleteLikesService,
    addCommentService,
    removerService,
    deleteCommentService,
    achar,
    findcommentService
   }
