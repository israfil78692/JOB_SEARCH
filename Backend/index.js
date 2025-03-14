import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import approute from './routes/application.route.js'
import path from 'path'
const app=express()
dotenv.config()



//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
    origin:'https://job-search-gkml.onrender.com',
    credentials:true
}
app.use(cors(corsOption))

const PORT=process.env.PORT||7000

const _dirname=path.resolve()

//api
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",approute)

app.use(express.static(path.join(_dirname,"/Fronend/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"Fronend","dist","index.html"))
})


app.listen(PORT,()=>{
    connectDB()
    console.log(`server running at port ${PORT}`);
    
})