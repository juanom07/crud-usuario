const express = require('express');
const router = express.Router();

const Usuarios = require('../models/usuarios');

router.get('/', async (req, res) => {
    const usuarios = await Usuarios.find();
    
    res.render('index', {
        usuarios //es lo mismo que colocar usuarios: usuarios - Actualizacion de JS
    });
});


router.post('/agregar', async (req, res) => {
    const usuario = new Usuarios(req.body);
    await usuario.save();

    res.redirect('/');
});

router.get('/borrar/:id', async (req, res) => {
    const {id} = req.params;
    await Usuarios.remove({_id: id});

    res.redirect('/');
});

router.get('/activar/:id', async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuarios.findById(id);

    usuario.activo = !usuario.activo;
    await usuario.save();

    res.redirect('/');
});

router.get('/editar/:id', async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuarios.findById(id);

    res.render('editar', {
        usuario
    });
});

router.post('/editar/:id', async (req, res) => {
    const {id} = req.params;

    await Usuarios.update({_id: id}, req.body); //Cuando encuentra al usuario, 
    //actualiza sus datos y setea los datos q estan en body

    res.redirect('/');
});


module.exports = router;