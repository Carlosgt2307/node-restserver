const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath='/api/usuarios';
        //Middelware
        this.middlewares();
        //Rutas de la aplicacion
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //lectura y parseo del body recibe lo que se envia
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
        
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen() {

        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ',this.port)
            console.log(`Servidor: http://localhost:${process.env.PORT}`)
        })
    }

}

module.exports = Server;
