const {response} = require('express');
const Especie = require('../models/especie');

const getEspecies = async(req, res = response )=>{
    
    const especies = await Especie.find();
    
    res.json({
        ok: true,
        especies
    });
}

const agregarEspecies = async (req, res = response )=>{
    
    const uid = req.uid;
    const especie = new Especie({
        usuario:uid,
        ...req.body
    });

    try {
        const especieDB = await especie.save();

            res.json({
             ok: true,
             especie: especieDB
        }); 

    } catch (error) {
             console.log(error)
             res.status(500).json({
             ok: false,
             msg: 'Error interno del servidor '
        })
    }


}

const actualizarEspecies = async(req, res = response )=>{
    
    const id = req.params.id;
    const uid = req.uid;

    try {
            const especie = await Especie.findById(id);

            if(!especie){
                return res.status(404).json({
                    ok:true,
                    msg: 'Especie no encontrada'
                });
            }

            const cambiosEspecie = {
                ...req.body,
                usuario: uid
            }

            const especieActualizado = await Especie.findByIdAndUpdate(id,cambiosEspecie, {new: true});

            res.json({
                ok: true,
                especie: especieActualizado
            })

        
    } catch (error) {

        console.log(error); 
        res.status(500).json({
            ok: false,
            msg:'Error interno del servidor'
        });
    }
       

}

const borrarEspecies = async(req, res = response)=>{

    const id = req.params.id;

        try {
                const especie = await Especie.findById(id);
    
                if(!especie){
                    return res.status(404).json({
                        ok:true,
                        msg: 'Especie no encontrada'
                    });
                }
    
                await Especie.findByIdAndDelete(id);
    
                  
                res.json({
                    ok: true,
                    msg: 'Especie eliminada'
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
    getEspecies,
    agregarEspecies,
    actualizarEspecies,
    borrarEspecies
}