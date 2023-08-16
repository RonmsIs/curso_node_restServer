const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google_verify');

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

const googleSignIn = async(req, res = response) =>{

    const {id_token} = req.body;


    try {

        const {nombre, img, correo} = await googleVerify(id_token);
       

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                rol: 'USER_ROL',
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario en BD 
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);      
        console.log(token);
        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'el token no se puedo verificar 123'
        })
        console.log(error)
    }

}

module.exports = {
    login,
    googleSignIn
};