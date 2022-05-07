const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const getUsers = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    //console.log(desde);

    //const Usuarios = await Usuario
     //                       .find({}, 'nombre email role google')
       //                     .skip(desde)
        //                    .limit(5);

    //const total = await Usuario.count();
    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

            Usuario.countDocuments()
    ]);
    
    res.json({
        ok: true,
        usuarios,
        total
    });
}


 const crearUsuario = async (req, res = response) => 
{
        const {email, password} = req.body;
        

        try {

            const existeEmail = await Usuario.findOne({email});
        
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya esta registrado'
                });
            }

            const usuario = new Usuario(req.body);
            
            //Encriptar password
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);

            //Guardar usuario
            await usuario.save();

            //Generar TOKEN-JWT
            const token = await generarJWT(usuario.id);            
             
            res.json({
                ok:true,
                usuario,
                token
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg: 'Error inesperado...'
            });
        }

   
 }

 const actualizarUsuario = async (req,res = response ) => {
     
     //TODO: validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
    
    
    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }



        //Actualizacion de datos
        const campos = req.body;
      

        if (usuarioDB.email === req.body.email){
            delete campos.email;
        }else{
            const existeEmail = await Usuario.findOne({ email: req.body.email});
            if (existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        delete campos.password;
        delete campos.google;
   
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok:true,
            usuario : usuarioActualizado
        }) 

     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok:false,
             msg: 'Error inesperado'
         });

     }
 }

 const borrarUsuario = async(req, res = response) => {
    
    const uid = req.params.id; 
    
    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
         
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Comunicate con la veterinaria'
         });
     }
 }

 module.exports = {
     getUsers,
     crearUsuario,
     actualizarUsuario,
     borrarUsuario,
 }

