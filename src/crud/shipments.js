import { readFiles , writeFiles, shipmentFilePath, whareHouseFilePath} from "../routes/routes.js"
import {Router} from "express"//esto es para definir las rutas de la appi
export const routerShipments = Router(); // Crea una instancia de Router para definir rutas de la api

routerShipments.post('/',(req,resp)=>{
    const shipments= readFiles(shipmentFilePath)
    const newShipment={
        id:shipments.length +1,
        item:req.body.item,
        quantity:req.body.quantity,
        whareHouseId:req.body.whareHouseId
    }
    shipments.push(newShipment)
    writeFiles(shipments)
    try {
        resp.status(201).json({"message": "shipments added successfully", "wharehouses": newWharehouses})
    } catch (error) {
        console.log(error)
    }

})



export default routerShipments


