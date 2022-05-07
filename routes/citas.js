/* '/api/citas' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getCitas,
    crearCitas,
    actualizarCitas,
    borrarCitas } = require('../controllers/citas');

const router = Router();

router.get('/', getCitas);

router.post('/',
    [ 
        validarJWT,
        check('motivo', 'El motivo de la cita es obligatorio').not().isEmpty(),
        check('fecCita', 'La fecha es necesaria').not().isDate(),
        check('horaCita', 'La hora es necesaria').not().isEmpty(),
        check('mascota','El codigo de mascota debe ser válido').isMongoId(),
        check('medico','El codigo de medico debe ser válido').isMongoId(),
        validarCampos
    ] 
    , crearCitas);

router.put('/:id', 
    [
        validarJWT,
        check('motivo', 'El motivo de la cita es obligatorio').not().isEmpty(),
        check('fecCita', 'La fecha es necesaria').not().isDate(),
        check('horaCita', 'La hora es necesaria').not().isEmpty(),
        check('mascota','El codigo de mascota debe ser válido').isMongoId(),
        check('medico','El codigo de medico debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarCitas);

router.delete('/:id',
    borrarCitas
    );

module.exports = router;