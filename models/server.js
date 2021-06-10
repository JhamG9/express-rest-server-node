const express = require('express');
var cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // CORS

        this.app.use(cors())

        // Middlewares
        this.middlewares();

        // Lectura y parseo del body
        this.app.use(express.json());

        // Rutas
        this.routes();
    }

    middlewares(){
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