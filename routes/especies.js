/* Ruta: /api/especies */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getEspecies, agregarEspecies, actualizarEspecies, borrarEspecies } = require('../controllers/especies');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getEspecies);

router.post('/',
    [
       validarJWT,
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       validarCampos
    ] 
    ,agregarEspecies);

router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    actualizarEspecies);

router.delete('/:id',

       borrarEspecies,
    );

module.exports = router;