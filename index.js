
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./databases/config');

//crear servidor de express
const app = express();

//Cors
app.use(cors());

//Lectura del body
app.use(express.json());

//Base de datos
dbConnection();

//Directorio público
app.use(express.static('public'));

//Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/citas',require('./routes/citas'));
app.use('/api/especies', require('./routes/especies'));
app.use('/api/mascotas', require('./routes/mascotas'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/razas', require('./routes/razas'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload',require('./routes/uploads'));

//Directorio public
app.use(express.static('public'));

//Rutas
app.get('/',(req,res)=>{

    res.json({
        ok: true,
        msg: 'Bienvenido/a'
    });

});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});