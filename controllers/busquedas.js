// getTodo

const { response } = require("express");
const Usuario = require("../models/usuario");
const Especie = require("../models/especie");
const Raza = require("../models/raza");
const Mascota = require("../models/mascota");
const Medico = require("../models/medico");
const Cita = require("../models/cita");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, especies, razas, mascotas, medicos, citas] =
    await Promise.all([
      Usuario.find({ nombre: regex }),
      Especie.find({ nombre: regex }),
      Raza.find({ nombre: regex }),
      Mascota.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
      Cita.find({ fechCita: regex }),
    ]);

  res.json({
    ok: true,
    msg: "getTodo",
    usuarios,
    especies,
    razas,
    mascotas,
    medicos,
    citas,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;

    case "especies":
      data = await Especie.find({ nombre: regex });
      break;

    case "razas":
      data = await Raza.find({ nombre: regex });
      break;

    case "mascotas":
      data = await Mascota.find({ nombre: regex })
                            .populate("raza", "nombre")
                            .populate("especie", "nombre");
      break;

    case "medicos":
      data = await Medico.find({ nombre: regex });
      break;

    case "citas":
      data = await Cita.find({ motivo: regex })
        .populate("usuario", "nombre")
        .populate("mascota", "nombre")
        .populate("medico", "nombre");
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser una existente ",
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
