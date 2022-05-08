const {response} = require('express');
const Cita = require('../models/cita');

const getCitas = async(req, res = response )=>{
    
    const citas = await Cita.find()
                            .populate('mascota','nombre')
                            .populate('usuario','nombre')
        res.json({
        ok: true,
        citas
    });
}

const crearCitas = async(req, res = response )=>{
    const uid = req.uid;
    const cita = new Cita({
        usuario:uid,
        ...req.body
    });

    try {
        const citaDB = await cita.save();

            res.json({
             ok: true,
             cita: citaDB
        }); 

    } catch (error) {
             console.log(error)
             res.status(500).json({
             ok: false,
             msg: 'Error interno del servidor '
        })
    }
}

const actualizarCitas = async(req, res = response )=>{
    const id = req.params.id;
    const uid = req.uid;

    try {
            const cita = await Cita.findById(id);

            if(!cita){
                return res.status(404).json({
                    ok:true,
                    msg: 'Cita no encontrada'
                });
            }

            const cambiosCita = {
                ...req.body,
                usuario: uid
            }

            const citaActualizado = await Cita.findByIdAndUpdate(id,cambiosCita, {new: true});

            res.json({
                ok: true,
                cita: citaActualizado
            })

        
    } catch (error) {

        console.log(error); 
        res.status(500).json({
            ok: false,
            msg:'Error interno del servidor'
        });
    }
}

const borrarCitas = async(req, res = response)=>{
    const id = req.params.id;

    try {
            const cita = await Cita.findById(id);

            if(!cita){
                return res.status(404).json({
                    ok:true,
                    msg: 'Cita no encontrada'
                });
            }

            await Cita.findByIdAndDelete(id);

              
            res.json({
                ok: true,
                msg: 'Cita eliminada'
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
    getCitas,
    crearCitas,
    actualizarCitas,
    borrarCitas
}

