import mongoose from "mongoose"



const conectDatabase = ()=>{
   mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true})
   .then(()=> console.log("mongodb connected")).catch((error)=>console.log(error))
}
export default conectDatabase