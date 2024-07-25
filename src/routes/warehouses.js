import files from "fs"
import Router from "express"
import path from "path"
import  {fileURLToPath}  from "url"

const fs=files
const router = Router(); // Crea una instancia de Router para definir rutas
const _filename = fileURLToPath(import.meta.url); // Obtiene la ruta del archivo actual
const _dirname = path.dirname(_filename); // Obtiene el directorio del archivo actual
const whareHouseFilePath = path.join(_dirname, "../../public/data/warehouses.json"); // Ruta al archivo JSON de wharehouses


// Leer los warehouses desde el archivo
async function readWharehouses() {
    try {
        const WharehousesData =  fs.readFile(whareHouseFilePath); 
        return JSON.parse(WharehousesData); // Parsea el contenido del archivo y lo devuelve como objeto JSON
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`); // Maneja errores en la lectura del archivo
    }
}

console.log(readWharehouses())













