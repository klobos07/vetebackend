const { Schema, model } = require('mongoose');

const CitaSchema = new Schema({
    motivo: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
    },
    peso: {
        type: String,
    },
    tratamiento:{
        type: String,
    },
    horaCita:{
        type: String,
        required: true
    },
    fechCita:{
        type: String,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    mascota:{
        type: Schema.Types.ObjectId,
        ref: 'Mascota',
        required: true
    },
    medico:{
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
});

    CitaSchema.method('toJSON',function( ){
        const {__v,...object} = this.toObject();
        return object;
 
 })
 
 module.exports = model('Cita',CitaSchema);