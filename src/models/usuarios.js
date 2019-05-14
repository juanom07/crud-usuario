const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre: String,
    apellido: String,
    activo: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('usuarios', usuariosSchema);