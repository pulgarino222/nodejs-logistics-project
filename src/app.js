import  express from "express";
import env from "dotenv"
import errorHandler from "./middleware/error.handlers.js";
import routerWarehouses from "./crud/wharehouses.js";
import routerShipments from "./crud/shipments.js";

const app=express()
env.config()

app.use(express.json());
app.use(errorHandler)
app.use("/warehouses",routerWarehouses)
app.use("/shipments", routerShipments)

const PORT= process.env.PORT || 3001



app.listen(PORT,()=>{
    console.log(`server is listen in port http://localhost:${PORT}`)
})


