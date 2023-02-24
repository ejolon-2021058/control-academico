const { request, response} = require('express');
const Usuario = require('../models/usuario');

const conteo = async(req = request, res= response, next) =>{
    const _id = req.usuario.id;
    const numeros = await Usuario.findById({
        _id    
    });
    console.log(Usuario.cursos);
    console.log(_id);

}

module.exports ={conteo}