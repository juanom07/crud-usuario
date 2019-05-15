const path = require('path');
const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');

const app = express();

//CONECTANDO LA BD
const sequelize = new Sequelize('mariadb://root:root@localhost:3306/crud');
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a MariaDB');
  })
  .catch(err => {
    console.error('No se ha podido conectar a la BD:', err);
  });

module.exports = sequelize;

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