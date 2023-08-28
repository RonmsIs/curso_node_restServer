const Rol = require('../models/Role');
const { Usuario, Categoria, Producto } = require('../models');


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
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
      throw new Error(`El id no existe ${id} `);
    }
}

const existeCategoriaPorId = async(id)=>{

  const existeCategoria = await Categoria.findById(id);
  if(!existeCategoria){
    throw new Error(`El id no existe ${id} `);
  }
}

const existeProductoPorId = async(id)=>{

  const existeProducto = await Producto.findById(id);
  if(!existeProducto){
    throw new Error(`El id no existe ${id} `);
  }
}

//validar las colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones=[])=>{

  const incluida = colecciones.includes(coleccion);
  if(!incluida){
    throw new Error(`La coleccion ${coleccion}, no es permitida, ${colecciones}`);
  }
  return true;
}
module.exports = {
    esRolValido,
    emailExist,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}