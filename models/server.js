const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        // Conectar a la base de datos
        this.connectDb();

        // Middlewares
        this.middlewares();

        // Lectura y parseo del body
        this.app.use(express.json());

        // Rutas
        this.routes();
    }

    async connectDb(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // Directorio publico   
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }
}




module.exports = Server;