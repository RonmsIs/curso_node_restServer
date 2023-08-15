const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

const validarJWT = async(req, res = response, next) =>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try{

       const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
       //leer el usuario que corresponde al uid
       const usuario = await Usuario.findById(uid);

       if(!usuario){
        return res.status(401).json({
            msg: 'Usuario no existe en la base de datos'
        })
       }

       //verificar si el uid tiene estao en true
       if(!usuario.estado){
        return res.status(401).json({
            msg: 'Token no valido - usuario con estado en false'
        })
       }

       req.usuario = usuario;
        next();
    }catch(error){
            console.log(error);
            res.status(401).json({
                msg: 'Token no valido'
            })
    }

    console.log(token);

    next();
}

module.exports = {
    validarJWT
};