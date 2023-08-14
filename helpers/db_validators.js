const Rol = require('../models/Role');
const Usuario = require('../models/Usuario');


const esRolValido = async(rol='') =>{
    const existeRol =  await Rol.findOne({rol});
    if (!existeRol){
             throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const emailExist = async(correo='')=>{
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
      throw new Error(`El correo ${correo} ya esta registrado `);
    }
}

const existeUsuarioPorId = async(id)=>{
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
      throw new Error(`El id no existe ${id} `);
    }
}

module.exports = {
    esRolValido,
    emailExist,
    existeUsuarioPorId
}