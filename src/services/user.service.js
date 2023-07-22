import User from "../modules/User.js"

const create = (body) => User.create(body)

const findAllService = ()=> User.find()

const findbyIdService = (id) => User.findById(id)


const updateService = (
    id,
    name,
    username,
    email,password,
    avatar,background)=> User.findByIdAndUpdate({_id: id},{    name,
        username,
        email,password,
        avatar,background})
export default {
    create,
    findAllService,
    findbyIdService,
    updateService
}