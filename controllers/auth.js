const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');
const usuario = require('../models/usuario');


const login = async(req,res = response) =>{

    const {email, password} = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({ email});

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No coincide'
            });
        } 

        //verificar password
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPassword){
            return res.status(400).json({
                ok:false,
                msg:'No coincide'
            });
        }

        //Generar token 
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
     console.log(error);
     res.status(500).json({
            ok:false,
            msg: 'Comuniquese con la veterinaria'
        })   
    }
}


const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

         // si el usuario no tiene imagen, le asignamos la de google
          if (!usuario.img) {
               usuario.img = picture;
          }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }

}

const renewToken =async(req,res = response) =>{
    const uid = req.uid;
    
    //Generar el TOKEN
    const token = await generarJWT(uid);


    const usuario = await Usuario.findById(uid);
    
    res.json({
        ok:true,
        token,
        usuario
    })
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}