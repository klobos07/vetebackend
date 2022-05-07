/* Ruta: /api/razas */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getRazas, agregarRazas, actualizarRazas, borrarRazas } = require('../controllers/razas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getRazas);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        validarCampos
    ] 
    ,
    agregarRazas);

router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        validarCampos
    ],
    actualizarRazas);

router.delete('/:id',

       borrarRazas,
    );

module.exports = router;