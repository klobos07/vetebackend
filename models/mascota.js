const { Schema, model } = require('mongoose');

const MascotaSchema = new Schema({
    nombreowner: {
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    edad: {
        type: String,
        required: true,
    },
    peso: {
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    fechanac: {
        type: String,
        required: true,
    },
    observaciones:{
        type: String,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    raza:{
        type: Schema.Types.ObjectId,
        ref: 'Raza',
        required: true
    },
    especie:{
        type: Schema.Types.ObjectId,
        ref: 'Especie',
        required: true
    }

});

    MascotaSchema.method('toJSON',function( ){
        const {__v,...object} = this.toObject();
        return object;
 
 })
 
 module.exports = model('Mascota',MascotaSchema);