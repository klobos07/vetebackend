/* '/api/citas' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getCitas,
    crearCitas,
    actualizarCitas,
    borrarCitas, getCitasByUser } = require('../controllers/citas');

const router = Router();

router.get('/:id', getCitas);

router.get('/usuario/:id', getCitasByUser);

router.post('/',
    [ 
        validarJWT,
        check('motivo', 'El motivo de la cita es obligatorio').not().isEmpty(),
        check('fechCita', 'La fecha es necesaria').not().isEmpty(),
        check('horaCita', 'La hora es necesaria').not().isEmpty(),
        check('mascota','El codigo de mascota debe ser válido').isMongoId(),
        check('medico','El codigo de medico debe ser válido').isMongoId(),
        validarCampos
    ] 
    , crearCitas);

router.put('/:id', 
    [
        validarJWT,
        validarCampos
    ],
    actualizarCitas);

router.delete('/:id',
    borrarCitas
    );

module.exports = router;