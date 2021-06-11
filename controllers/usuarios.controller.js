const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {
    // const query = req.query;
    const { q, nombre, apiKey } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apiKey
    });
}

const usuariosPost = async (req, res = response) => {
   

    // Asignar usuario
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Verificar si el correo existe    
    const issetEmail = await User.findOne({ email });

    if (issetEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar usuario
    await user.save();
    
    res.json({
        user
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - controlador',
        id: id
    });

}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}