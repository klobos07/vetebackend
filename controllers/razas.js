const {response} = require('express');
const Raza = require('../models/raza');

const getRazas = async(req, res = response )=>{

    const razas = await Raza.find();

    res.json({
        ok: true,
        razas
    });
}

const agregarRazas = async (req, res = response )=>{
    const uid = req.uid;
    const raza = new Raza({
        usuario:uid,
        ...req.body
    });

    try {
        const razaDB = await raza.save();

            res.json({
             ok: true,
             raza: razaDB
        }); 

    } catch (error) {
             console.log(error)
             res.status(500).json({
             ok: false,
             msg: 'Error interno del servidor '
        })
    }

}

const actualizarRazas = async(req, res = response )=>{

    const id = req.params.id;
const uid = req.uid;

    try {
            const raza = await Raza.findById(id);

            if(!raza){
                return res.status(404).json({
                    ok:true,
                    msg: 'Raza no encontrada'
                });
            }

            const cambiosRaza = {
                ...req.body,
                usuario: uid
            }

            const razaActualizado = await Raza.findByIdAndUpdate(id,cambiosRaza, {new: true});

            res.json({
                ok: true,
                raza: razaActualizado
            })

        
    } catch (error) {

        console.log(error); 
        res.status(500).json({
            ok: false,
            msg:'Error interno del servidor'
        });
    }
}

const borrarRazas = async(req, res = response)=>{
    const id = req.params.id;

        try {
                const raza = await Raza.findById(id);
    
                if(!raza){
                    return res.status(404).json({
                        ok:true,
                        msg: 'Raza no encontrada'
                    });
                }
    
                await Raza.findByIdAndDelete(id);
                      
                res.json({
                    ok: true,
                    msg: 'Raza eliminada'
                })
    
            
        } catch (error) {
    
            console.log(error); 
            res.status(500).json({
                ok: false,
                msg:'Error interno del servidor'
            });
        }
        
}

module.exports = {
    getRazas,
    agregarRazas,
    actualizarRazas,
    borrarRazas
}