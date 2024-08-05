import { readFiles, writeFiles, driverFilePath } from "../routes/routes.js";
import { Router } from "express"; // Importa Router para definir las rutas de la API
export const routerDrivers = Router(); // Crea una instancia de Router para definir rutas de la API

routerDrivers.post('/', (req, resp) => {
    let drivers;
    try {
        drivers = readFiles(driverFilePath);
    } catch (error) {
        console.log(error);
    }
    
    const newDriver = {
        id: drivers.length + 1,
        name: req.body.name,
        licenseNumber: req.body.licenseNumber,
        vehicleType: req.body.vehicleType
    };

    drivers.push(newDriver);
    writeFiles(drivers, driverFilePath);
    try {
        resp.status(201).json({ "message": "Driver added successfully", "driver": newDriver });
    } catch (error) {
        console.log(error);
    }
});

routerDrivers.get('/', (req, resp) => {
    try {
        resp.json(readFiles(driverFilePath));
    } catch (error) {
        resp.status(404).send("Not found", error);
    }
});

routerDrivers.get('/:id', (req, resp) => {
    const drivers = readFiles(driverFilePath);

    let driver = drivers.find(driver => driver.id == req.params.id);
    if (!driver) {
        resp.status(404).send("Driver ID not found");
    } else {
        resp.json(driver);
    }
});

routerDrivers.put('/:id', (req, resp) => {
    const drivers = readFiles(driverFilePath);
    const indexToUpdate = drivers.findIndex(driver => driver.id === parseInt(req.params.id));
    
    const updatedDriver = {
        ...drivers[indexToUpdate],
        name: req.body.name,
        licenseNumber: req.body.licenseNumber,
        vehicleType: req.body.vehicleType
    };

    drivers[indexToUpdate] = updatedDriver;
    writeFiles(drivers, driverFilePath);
    resp.status(201).send(`Driver updated successfully: ${JSON.stringify(updatedDriver)}`);
});

routerDrivers.delete('/:id', (req, resp) => {
    const drivers = readFiles(driverFilePath);
    const indexToDelete = drivers.findIndex(driver => driver.id == req.params.id);
    const deletedDriver = drivers.splice(indexToDelete, 1)[0];

    writeFiles(drivers, driverFilePath);
    resp.status(200).send(`Driver deleted successfully: ${JSON.stringify(deletedDriver)}`);
});

export default routerDrivers;

