const Sequelize = require('sequelize');

const sequelize = require('../app');

const Usuarios = sequelize.define('Usuarios', {
        // attributes
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        activo: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    }, {
        // options
    }
);

Usuarios.sync();

module.exports = Usuarios;