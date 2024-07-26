import { readFiles , writeFiles, shipmentFilePath} from "../routes/routes.js"
import {Router} from "express"//esto es para definir las rutas de la appi
export const routerShipments = Router(); // Crea una instancia de Router para definir rutas de la api

routerShipments.post('/',(req,resp)=>{
    let shipments
    try {
         shipments= readFiles(shipmentFilePath)
    } catch (error) {
        console.log(error)
    }
    
    const newShipment={
        id:shipments.length +1,
        item:req.body.item,
        quantity:req.body.quantity,
        whareHouseId:req.body.whareHouseId
    }

    shipments.push(newShipment)
    writeFiles(shipments,shipmentFilePath)
    try {
        resp.status(201).json({"message": "shipments added successfully", "wharehouses": newShipment})
    } catch (error) {
        console.log(error)
    }

})

/*El método resp.json() en Express se utiliza para enviar una respuesta JSON al cliente. Cuando llamas a resp.json(data),
 Express convierte automáticamente el objeto data en una cadena JSON y establece el encabezado Content-Type de la respuesta a application/json.*/
routerShipments.get('/',(req,resp)=>{
    try{resp.json(readFiles(shipmentFilePath))}
    catch(error){
        resp.status(404).send("not found",error)
    }
    
})

routerShipments.get('/:id',(req,resp)=>{
    const shipments=readFiles(shipmentFilePath)

    let idWanted=shipments.find(shipment=>shipment.id==req.params.id)
    if(!idWanted){
        resp.status(404).send("no se encontro el id buscado")
    }
    resp.json(idWanted)
})

routerShipments.put('/:id',(req,resp)=>{
   const  shipments=readFiles(shipmentFilePath)
   const indexToUpdate= shipments.findIndex(shipment=>shipment.id===parseInt(req.params.id))
   
   const update={
    ...shipments[indexToUpdate],
    item: req.body.item,
    quantity:req.body.quantity,
    whareHouseId:req.body.whareHouseId
   }

   shipments[indexToUpdate]=update
   
    writeFiles(shipments,shipmentFilePath)
    resp.status(201).send(`shipments update successfully ${JSON.stringify(update)}`)
   
})


routerShipments.delete('/:id',(req,resp)=>{
    const shipments=readFiles(shipmentFilePath)
    const indexToDelete=shipments.findIndex(shipment=>shipment.id==req.params.id)
    shipments.splice(indexToDelete,1)

    writeFiles(shipments,shipmentFilePath)
    resp.status(200).send(`se a eliminado correctamente ${JSON.stringify(shipments[indexToDelete])}`)

})






export default routerShipments


