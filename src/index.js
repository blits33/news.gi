import  express  from "express"
import conectDatabase from "./database/db.js"



import dotenv from "dotenv"
dotenv.config()

import authRoute from '../src/routes/auth.route.js'
import newsRoute from '../src/routes/news.route.js'
import userRoute from '../src/routes/user.route.js'

const app = express()
app.use(express.json())
conectDatabase()
app.use("/user",userRoute)
app.use("/auth",authRoute)
app.use("/news",newsRoute)


app.get("/ho", (req,res)=>{
    res.send("hello")
})
app.listen(3000)