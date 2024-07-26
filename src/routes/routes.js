import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtiene la ruta del archivo actual y el directorio del archivo actual
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Define las rutas a los archivos JSON
export const whareHouseFilePath = path.join(_dirname, '../../public/data/warehouses.json');
export const shipmentFilePath = path.join(_dirname, '../../public/data/shipments.json');
export const vehiclesFilePath = path.join(_dirname, '../../public/data/vehicles.json');
export const driversFilePath = path.join(_dirname, '../../public/data/drivers.json');

// Función para leer archivos JSON
export const readFiles = (routNecesary) => {
    try {
        // Lee el archivo con la ruta proporcionada y en encoding UTF-8
        const fileThatWasReading = fs.readFileSync(routNecesary, 'utf-8');
        // Parsea el contenido del archivo como JSON
        return JSON.parse(fileThatWasReading);
    } catch (err) {
        // Maneja el error con un mensaje más descriptivo
        throw new Error(`Ha ocurrido un error leyendo la base de datos de warehouses: ${err.message}`);
    }
};

// Función para escribir archivos JSON
export const writeFiles = (fileThatWasReading,routNecesary) => {
    fs.writeFileSync(routNecesary, JSON.stringify(fileThatWasReading, null, 2));
};





// const readFileAnimes=()=>{
//     fs.readFile(whareHouseFilePath,"utf-8",(err,data)=>{
//         if(data){
//             return JSON.parse(data)
//         }else{
//             throw new error("ha ocurrido un error",err)
//         }
//     })
// }












