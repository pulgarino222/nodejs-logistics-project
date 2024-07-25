
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Ocurrió un error en el servidor"});//Envía una respuesta JSON al cliente con un mensaje que indica que ocurrió un error en el servidor.
};

export default errorHandler;

