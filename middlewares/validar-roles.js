const { request, response } = require('express');

//Verificador si es maestro
const esProfesorRole = (req = request, res = response, next) => {

    //Si no viene el usuario
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se require verificar el role sin validar el token primero'
        });
    }

    //Verificar que le rol sea ROLE_MAESTRO
    const { rol, nombre } = req.usuario;

    if ( rol !== 'ROLE_MAESTRO' ) {
        return res.status(500).json({
            msg: `${ nombre } no es Profesor - No tiene acceso a esta función`
        });
    }

    next();


}


const esAlumnoRole = (req = request, res = response, next) => {

    //Si no viene el usuario
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se require verificar el role sin validar el token primero'
        });
    }

    //Verificar que le rol sea ROLE_ALUMNO
    const { rol, nombre } = req.usuario;

    if ( rol !== 'ROLE_ALUMNO' ) {
        return res.status(500).json({
            msg: `${ nombre } no es Alumno - No tiene acceso a esta función`
        });
    }

    next();


}

//Operador rest u operador spread 
const tieneRole = ( ...roles ) => {

    return (req = request, res= response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })

        }

        next();

    }

}
/*
function validarTamañoArray(req, res, next) {
    if (req.cursos.length < 3) {
      next();
    } else {
      res.status(400).send("No se pueden agregar más elementos al array.");
    }
  }
  */


module.exports = {
    tieneRole,
    esProfesorRole,
    esAlumnoRole,
    //validarTamañoArray
}