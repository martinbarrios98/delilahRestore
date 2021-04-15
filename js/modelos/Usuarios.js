const { Sequelize } = require('sequelize');
const db = require('../../config/db');

const Usuarios = db.define('usuarios', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: Sequelize.STRING(60),
    nombre: Sequelize.STRING(60),
    apellido: Sequelize.STRING(60),
    correo: Sequelize.STRING(60),
    direccion: Sequelize.STRING(60),
    telefono: Sequelize.STRING(60),
    password: Sequelize.STRING(60)

});

module.exports = Usuarios;