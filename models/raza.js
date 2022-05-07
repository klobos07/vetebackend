const { Schema, model } = require('mongoose');

const RazaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
});

    RazaSchema.method('toJSON',function( ){
        const {__v,...object} = this.toObject();
        return object;
 
 })
 
 module.exports = model('Raza', RazaSchema);