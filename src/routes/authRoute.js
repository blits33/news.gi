import express from "express"
const router = express.Router()
import auth from '../controllers/authController.js'




router.post("/login",auth)

export default router