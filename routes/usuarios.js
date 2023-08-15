
const {Router} = require('express');
const { check } = require('express-validator');

const{
        validarCampos,
        esAdminRole,
        tieneRole,
        validarJWT
} = require('../middlewares');

const { esRolValido, emailExist, existeUsuarioPorId } = require('../helpers/db_validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');




const router = Router();

router.get('/', usuariosGet);

router.patch('/', usuariosPatch);

router.put('/:id',[
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPut);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe ser mas de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExist),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPost);
  
router.delete('/:id',[
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE','VENTAS_ROL','OTRO_ROL'),
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);




module.exports = router;