/* Ruta: api/upload/ */

const { Router} = require('express');
const { fileUpload } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');
const {retornaImagen} = require('../controllers/uploads');



const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id',validarJWT,fileUpload);

router.get('/:tipo/:foto',retornaImagen);


module.exports = router;