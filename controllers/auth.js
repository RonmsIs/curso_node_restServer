const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req, res=response) =>{

    const {correo, password} = req.body;

    try{

        //verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(404).json({
                msg: 'Usuario o contraseña no son correctos'
            });
        }

        //verificar si el usuario esta activo
        if(!usuario.estado ){
            return res.status(404).json({
                msg: 'Usuario o contraseña no son correctos - estado:false'
            });
        }

        //verificar la contrseña
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if(!validPass ){
            return res.status(404).json({
                msg: 'Usuario o contraseña no son correctos - password'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });    

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

module.exports = {
    login
};