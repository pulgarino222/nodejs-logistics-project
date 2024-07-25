import  express from "express";
import env from "dotenv"
import errorHandler from "./middleware/error.handlers.js";

const app=express()
env.config()

app.use(errorHandler)

const PORT= process.env.PORT || 3001



app.listen(PORT,()=>{
    console.log(`server is listen in port http://localhost:${PORT}`)
})
