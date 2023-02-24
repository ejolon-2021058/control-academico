//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getCursosPorId, postCurso, putCurso, deleteCurso, getCursoAlumnos } = require('../controllers/curso');
const { existeCursoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esProfesorRole, esRoleValido, esAlumnoRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrarCursoMaestro',[
    validarJWT,
    esProfesorRole,
    validarCampos
], getCursosPorId);



router.post('/agregarCurso', [
    validarJWT,
    esProfesorRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,

] ,postCurso);




router.put('/editarCurso/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom( existeCursoPorId ),
    validarJWT,
    esProfesorRole,
    //check('rol').custom( esRoleValido ),
    validarCampos
] ,putCurso);


router.delete('/eliminar/:id', [
    validarJWT,
    esProfesorRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
] ,deleteCurso);


module.exports = router;