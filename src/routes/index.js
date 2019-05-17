const express = require('express');
const router = express.Router();

const Usuarios = require('../models/usuarios');
const Perfiles = require('../models/perfiles');

router.get('/', async (req, res) => {
    const usuarios = await Usuarios.findAll({
        include: [ //Estas declaraciones se pueden ir anidando, dependiendo las entidades q quiera incluir
          {
            model: Perfiles
          }
        ]
      });
    const perfiles = await Perfiles.findAll();

    res.render('index', {
        usuarios, //es lo mismo que colocar usuarios: usuarios - Actualizacion de JS
        perfiles
    });
});


router.post('/agregar', async (req, res) => {
    const usuario = new Usuarios(req.body);
    await usuario.save();

    res.redirect('/');
});

router.get('/borrar/:id', async (req, res) => {
    const {id} = req.params;
    await Usuarios.destroy({where:{id: id}});

    res.redirect('/');
});

router.get('/activar/:id', async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuarios.findOne({where:{id: id}});

    usuario.activo = !usuario.activo;
    await usuario.save();

    res.redirect('/');
});

router.get('/editar/:id', async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuarios.findOne({
        where: {id: id},
        include: [
            {
              model: Perfiles
            }
        ]
    });

    const perfiles = await Perfiles.findAll();

    res.render('editar', {
        usuario,
        perfiles
    });
});

router.post('/editar/:id', async (req, res) => {
    const {id} = req.params;

    await Usuarios.update(req.body, {where:{id: id}}); //Cuando encuentra al usuario, 
    //actualiza sus datos y setea los datos q estan en body

    res.redirect('/');
});


module.exports = router;