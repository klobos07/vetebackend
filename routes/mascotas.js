/* '/api/mascotas' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getMascotas, crearMascotas, actualizarMascotas, borrarMascotas } = require('../controllers/mascotas');

const router = Router();

router.get('/', getMascotas);

router.post('/',
    [ 
        validarJWT,
        check('nombreowner', 'El nombre del encargado es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre de la mascota es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('fechanac', 'La fecha de nacimiento de la mascota es obligatoria').not().isDate(),
        check('peso', 'El peso es obligatorio').not().isEmpty(),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        check('observaciones', 'Agregar detalles de la mascota').not().isEmpty(),
        check('raza','El codigo de raza debe ser válido').isMongoId(),
        check('especie','El codigo de especie debe ser válido').isMongoId(),
        validarCampos
    ] 
    , crearMascotas);

router.put('/:id', 
    [ 
        validarJWT,
        check('nombreowner', 'El nombre del encargado es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre de la mascota es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('fechanac', 'La fecha de nacimiento de la mascota es obligatoria').not().isDate(),
        check('peso', 'El peso es obligatorio').not().isEmpty(),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        check('observaciones', 'Agregar detalles de la mascota').not().isEmpty(),
        check('raza','El codigo de raza debe ser válido').isMongoId(),
        check('especie','El codigo de especie debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMascotas);

router.delete('/:id',
    borrarMascotas
    );

module.exports = router;