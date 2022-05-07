
const path = require('path');
const fs = require('fs');

const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


     //validar tipo
     const tiposValidos = ['usuarios','medicos'];
     if(!tiposValidos.includes(tipo)){
         return res.status(400).json({
             ok: false,
             msg: 'Tipo no valido'
         })
     }

    //validar que exista un archivo
     if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningún archivo'
        });
      }

      //procesar la imagen
      const file = req.files.imagen;

      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length -1];

      const extensionesValidas = ['png','jpg','jpeg','gif'];
      if( !extensionesValidas.includes(extensionArchivo)){
          return res.status(400).json({
              ok: false,
              msg: 'no es una extension permitida'
          });
      }

      //Generar el nombre
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

      //path para almacenar imagen
      const path = `./uploads/${tipo}/${nombreArchivo}`;
      file.mv(path,(err) =>{
          if(err){
              console.log(err)
              return res.status(500).json({
                  ok: false,
                  msg: 'Error al mover la imagen'
              });
          }

          //Actualizar base de datos
          actualizarImagen(tipo, id,nombreArchivo);

            res.json({
            ok:true,
            msg: 'Archivo cargado',
            nombreArchivo

        });

    });
}

        const retornaImagen = (req, res = response) => {
            const tipo = req.params.tipo;
            const foto = req.params.foto;

            const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
            
            if(fs.existsSync(pathImg)){
                res.sendFile(pathImg);  
            } else {
                const pathImg = path.join(__dirname,`../uploads/no-image-available.jpg`);
                res.sendFile(pathImg); 
            }


       
        }


module.exports = {
        fileUpload,
        retornaImagen
}