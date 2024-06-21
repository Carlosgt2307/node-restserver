const {Router} = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controller/usuarios');
const router = Router();

router.get('/', usuariosGet )

router.put('/:id', usuariosPut );

router.post('/',[
    check('nombre','El Nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('password','El Password obligatorio y mas de 6 letras').isLength({min: 6}),
    //check('rol','No es un Rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost );

router.delete('/',usuariosDelete  );

router.patch('/', usuariosPatch );

module.exports = router;
