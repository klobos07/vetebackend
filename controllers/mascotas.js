const {response} = require('express');
const Mascota = require('../models/mascota');

const getMascotas = async(req, res = response )=>{
    const mascotas = await Mascota.find()
                                 .populate('raza','nombre')
                                 .populate('especie','nombre')
    res.json({
        ok: true,
        mascotas
    });
}

const crearMascotas = async(req, res = response )=>{
    const uid = req.uid;
    const mascota = new Mascota({
        usuario:uid,
        ...req.body
    });

    try {
        const mascotaDB = await mascota.save();

            res.json({
             ok: true,
             mascota: mascotaDB
        }); 

    } catch (error) {
             console.log(error);
             res.status(500).json({
             ok: false,
             msg: 'Error interno del servidor '
        })
    }
}

const actualizarMascotas = async(req, res = response )=>{
    const id = req.params.id;
    const uid = req.uid;

    try {
            const mascota = await Mascota.findById(id);

            if(!mascota){
                return res.status(404).json({
                    ok:true,
                    msg: 'Mascota no encontrada'
                });
            }

            const cambiosMascota = {
                ...req.body,
                usuario: uid
            }

            const mascotaActualizado = await Mascota.findByIdAndUpdate(id,cambiosMascota, {new: true});

            res.json({
                ok: true,
                mascota: mascotaActualizado
            })

        
    } catch (error) {

        console.log(error); 
        res.status(500).json({
            ok: false,
            msg:'Error interno del servidor'
        });
    }
}

const borrarMascotas = async(req, res = response)=>{
    const id = req.params.id;

        try {
                const mascota = await Mascota.findById(id);
    
                if(!mascota){
                    return res.status(404).json({
                        ok:true,
                        msg: 'Mascota no encontrada'
                    });
                }
    
                await Mascota.findByIdAndDelete(id);
                      
                res.json({
                    ok: true,
                    msg: 'Mascota eliminada'
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
    getMascotas,
    crearMascotas,
    actualizarMascotas,
    borrarMascotas
}