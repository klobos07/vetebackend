const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');

const borrarImagen = (path) => {
    
    if(fs.existsSync(path)){
        //borrar imagen anterior
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async(tipo,id,nombreArchivo) => {


    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);

            if(!medico){
                console.log('no se encontro id medico')
                return false;
            }

            const pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            medico.save();
            return true;

        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);

            if(!usuario){
                console.log('no se encontro id usuario')
                return false;
            }

            const pathAntes = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathAntes);
            
            usuario.img = nombreArchivo;
            usuario.save();
            return true;
        break;
    }
    

}

module.exports = {
    actualizarImagen
}