const Sequelize = require('sequelize');

const sequelize = require('../app');

const Perfiles = sequelize.define('Perfiles', {
        // attributes
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }
);

Perfiles.sync();

module.exports = Perfiles;