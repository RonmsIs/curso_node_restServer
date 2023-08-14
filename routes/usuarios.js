
const {Router} = require('express');

const { validarCampos } = require('../middlewares/validar_campos');
const { esRolValido, emailExist, existeUsuarioPorId } = require('../helpers/db_validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');


const router = Router();

router.get('/', usuariosGet);

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


router.patch('/', usuariosPatch);
  
router.delete('/:id',[
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);




module.exports = router;