const { Schema, model } = require('mongoose');

const MedicoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    telefono:{
        type: String,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

    MedicoSchema.method('toJSON',function( ){
        const {__v,...object} = this.toObject();
        return object;
 
 })
 
 module.exports = model('Medico',MedicoSchema);