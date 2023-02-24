const { response, request } = require('express');
const { Query } = require('mongoose');
//Importación del modelo
const Curso = require('../models/curso');
const usuario = require('../models/usuario');


const getCurso = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query).populate('maestro', 'nombre')
    ]);

    res.json({
        msg: 'get Api - Controlador curso',
        listaCursos
    });

}



const getCursosPorId = async (req = request, res = response) => {
    const _id = req.usuario.id;
    const query = { estado: true, maestro: _id };
  
    const listaCurso = await Promise.all([
      Curso.countDocuments(query),
      Curso.find(query).populate("maestro", "nombre",),
    ]);
  
    res.json({
      msg: "get Api - Controlador Usuario",
      listaCurso,
    });
  };
 

const postCurso = async (req = request, res = response) => {
    //toUpperCase para todo a Mayusculas
    const nombre = req.body.nombre.toUpperCase();

    const cursoDB = await Curso.findOne({ nombre });

    //validacion para verificar si ya existe dicha curso para que no lo agregue
    if (cursoDB) {
        return res.status(400).json({
            msg: `El curso ${cursoDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        maestro: req.usuario._id
    }

    const curso = new Curso(data);
    //Guardar en DB
    await curso.save();

    res.status(201).json(curso);

}

const putCurso = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    //resto.curso = resto.curso.toUpperCase();
    resto.usuario = req.usuario._id;

    const cursoEditado = await Curso.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(cursoEditado);


};

const deleteCurso = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    const cursoEliminado = await Curso.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE eliminar curso',
        cursoEliminado
    });
}

module.exports = {
    getCursosPorId,
    postCurso,
    putCurso,
    deleteCurso,
    getCurso


}