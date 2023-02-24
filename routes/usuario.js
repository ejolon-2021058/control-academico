//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
//const { getCursoAlumnos } = require('../controllers/curso');
const { getCursoAlumnos,postUsuario, putUsuarioPerfil, deleteUsuario, putAsignarCurso } = require('../controllers/usuario');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAlumnoRole, validarTamañoArray } = require('../middlewares/validar-roles');

const router = Router();

//router.get('/mostrarCursosAlumno/:id', getUsuariosCursosAlumno);
/*
router.get('/mostrarCursosAlumno',[
    validarJWT,
    esAlumnoRole,
    validarCampos,
    conteo
],getUsuariosPorId);
*/
router.post('/registrarProfesor', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol', 'No es un rol válido').isIn(['ROLE_MAESTRO']),
    check('rol').custom( esRoleValido ),
    validarCampos,
] ,postUsuario);

router.post('/registrarAlumno',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').default("ROLE_ALUMNO").custom(esRoleValido ),
    validarCampos,
],postUsuario);


router.put('/editarPerfilAlumno/:id', [
    validarJWT,
    esAlumnoRole,
    check('correo').custom( emailExiste ),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
] ,putUsuarioPerfil);


router.delete('/eliminarPerfil/:id', [
    validarJWT,
    esAlumnoRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuario);


router.put('/asignarseCursos/:id', [
    validarJWT,
    esAlumnoRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
] ,putAsignarCurso);


router.get('/mostrarCursoAlumno',[
    validarJWT,
    esAlumnoRole,
    validarCampos
], getCursoAlumnos);




module.exports = router;

