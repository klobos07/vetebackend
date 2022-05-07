/* Ruta: /api/usuarios */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsers, crearUsuario , actualizarUsuario , borrarUsuario} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT ,getUsers);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ] 
    ,crearUsuario);

router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario);

router.delete('/:id',
        validarJWT,
       borrarUsuario,
    );

module.exports = router;