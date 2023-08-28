const  validarCampos  = require('../middlewares/validar_campos');
const  validarJWT  = require('../middlewares/validarJWT');
const  validaRoles  = require('../middlewares/validar_roles');
const  validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validaRoles,
    ...validarJWT,
    ...validarArchivo
}