const express = require('express');
const router = express.Router();

const Perfiles = require('../models/perfiles');

router.get('/', async (req, res) => {
    const perfiles = await Perfiles.findAll();
    
    res.render('indexPerfiles', {
        perfiles
    });
});


router.post('/agregar', async (req, res) => {
    const perfil = new Perfiles(req.body);
    await perfil.save();

    res.redirect('/perfiles');
});

router.get('/borrar/:id', async (req, res) => {
    const {id} = req.params;
    await Perfiles.destroy({where:{id: id}});

    res.redirect('/perfiles');
});

router.get('/editar/:id', async (req, res) => {
    const {id} = req.params;
    const perfil = await Perfiles.findOne({where:{id: id}});

    res.render('editarPerfil', {
        perfil
    });
});

router.post('/editar/:id', async (req, res) => {
    const {id} = req.params;

    await Perfiles.update(req.body, {where:{id: id}}); 

    res.redirect('/perfiles');
});


module.exports = router;