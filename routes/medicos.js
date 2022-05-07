/* Ruta: /api/medicos */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        validarCampos
    ] 
    ,crearMedicos);

router.put('/:id', 
    [
        
    ],
    actualizarMedicos);

router.delete('/:id',

       borrarMedicos,
    );

module.exports = router;