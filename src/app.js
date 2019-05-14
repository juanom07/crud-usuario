const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//CONECTANDO LA BD
mongoose.connect('mongodb://localhost/crud-usuarios')
    .then(db => console.log('DB Conectada'))
    .catch(err => console.log(err));

//IMPORTANDO RUTAS
const indexRouter = require('./routes/index');

//CONFIGURACION
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//RUTAS
app.use('/', indexRouter);

//INICIANDO EL SERVIDOR
app.listen(app.get('port'), () => {
    console.log(`Escuchando el puerto ${app.get('port')}..`);
});