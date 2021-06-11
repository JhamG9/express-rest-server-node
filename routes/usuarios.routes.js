// Impotaciones server
const { Router } = require('express');
const { check } = require('express-validator');

// Importaciones propias
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValidate } = require('../helpers/db-validators');

// Instancias
const router = Router();

// Rutas
router.get('/', usuariosGet);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    // Al recibir 1 parametro una validación personalizada no es necesario pasarle el parametro
    check('role').custom(isRoleValidate),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);


module.exports = router;