import { readFiles , writeFiles,whareHouseFilePath } from "../routes/routes.js"
import {Router} from "express"//esto es para definir las rutas de la appi
export const routerWarehouses = Router(); // Crea una instancia de Router para definir rutas de la api


routerWarehouses.post('/',(req,resp)=>{
    const wharehouses=readFiles(whareHouseFilePath)
    const newWharehouses={
        id: wharehouses.length +1,
        name: req.body.name,
        location:req.body.location
    }
    wharehouses.push(newWharehouses)
    writeFiles(wharehouses)
    try {
        resp.status(201).json({"message": "wharehouses added successfully", "wharehouses": newWharehouses})
    } catch (error) {
        console.log(error)
    }
    

})

routerWarehouses.get('/',(req,resp)=>{
    resp.json(readFiles(whareHouseFilePath))
    

})

routerWarehouses.get('/:id',(req,resp)=>{
    const wharehouses=readFiles(whareHouseFilePath)
    const wharehouse=wharehouses.find(wharehouse=>wharehouse.id===parseInt(req.params.id))
    if(!wharehouse){return resp.status(404).send("wharehouse not fund")} 
    return resp.json(wharehouse)

})


routerWarehouses.put('/:id',(req,resp)=>{
    const wharehouses=readFiles(whareHouseFilePath)
    const editedWharehouse= wharehouses.findIndex(wharehouse=>wharehouse.id===parseInt(req.params.id))
    const updateWharhouse={
        ...wharehouses[editedWharehouse],
        name:req.body.name,
        location:req.body.location
    }
    wharehouses[editedWharehouse]=updateWharhouse
    writeFiles(wharehouses)
    resp.status(200).send(`wharehouse update successfully ${JSON.stringify(updateWharhouse)}`)
})

routerWarehouses.delete('/:id',(req,resp)=>{
    const wharehouses=readFiles(whareHouseFilePath)
    const DeleteWharehouses = wharehouses.findIndex(wharehouse=>wharehouse.id===parseInt(req.params.id))
    if(!DeleteWharehouses){
        return resp.status(404).send("warehouse to delete is wrong")
    }
    wharehouses.splice(DeleteWharehouses,1)
    writeFiles(wharehouses)
    resp.status(200).send("wharehouse was deleted")

})




export default routerWarehouses