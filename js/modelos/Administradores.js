const { Sequelize } = require('sequelize');
const db = require('../../config/db');

const Administradores = db.define('administradores', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: Sequelize.STRING(60),
    password: Sequelize.STRING(60)

});

module.exports = Administradores;