const { Schema, model } = require('mongoose');

const EspecieSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    usuario:{
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
});

    EspecieSchema.method('toJSON',function( ){
        const {__v,...object} = this.toObject();
        return object;
 
 })
 
 module.exports = model('Especie', EspecieSchema);