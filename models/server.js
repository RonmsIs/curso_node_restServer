const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');
class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios'

        //Conectar a la base de datos
        this.conectarDatabase();

        //Middlewares funcion que siempre se levanta al iniciar el servidor
        this.middlewares();
        //rutas de mi aplicación
        this.routes();  
    }

    async conectarDatabase(){

        await dbConnection();

    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Parseio y lecura del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port,() => {
            console.log('',this.port)
        });
        
    }
}

module.exports = Server;