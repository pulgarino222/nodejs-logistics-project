import fs from "fs"
import {Router} from "express"//esto es para definir las rutas de la appi
import path from "path"//esto nos arroja rutas de archivos y directorios
import  {fileURLToPath}  from "url"//esto simplemente nos ayuda a reconocer la ubicacion actual donde estamos parados



////////////////////////////////////////////////////////////////////////////////////////////////////////////
const routerWarehouses = Router(); // Crea una instancia de Router para definir rutas de la api
const _filename = fileURLToPath(import.meta.url); // Obtiene la ruta del archivo actual
const _dirname = path.dirname(_filename); // Obtiene el directorio del archivo actual
const whareHouseFilePath = path.join(_dirname, `../../public/data/warehouses.json`); // Ruta al archivo JSON de wharehouses


// Leer los warehouses desde el archivo

const readFiles=()=>{
    try{
        const wharehouses=fs.readFileSync(whareHouseFilePath,`utf-8`)
        return JSON.parse(wharehouses)
    }catch(err){
        throw new Error ("ha ocurrido un error leyendo la base de datos de wharehouses",err)

    }
}

const writeFiles=(wharehouses)=>{
    fs.writeFileSync(whareHouseFilePath,JSON.stringify(wharehouses,null,2))

}

routerWarehouses.post('/',(req,resp)=>{
    const wharehouses=readFiles()
    const newWharehouses={
        id: wharehouses.length +1,
        name: req.body.name,
        location:req.body.location
    }
    wharehouses.push(newWharehouses)
    writeFiles(wharehouses)
    resp.status(201).json({"message": "wharehouses added successfully", "anime": newWharehouses})

})


// const readFileAnimes=()=>{
//     fs.readFile(whareHouseFilePath,"utf-8",(err,data)=>{
//         if(data){
//             return JSON.parse(data)
//         }else{
//             throw new error("ha ocurrido un error",err)
//         }
//     })
// }




export default routerWarehouses










