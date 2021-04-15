const { Sequelize } = require('sequelize');
const shortid = require('shortid');
const db = require('../../config/db');

const Platos = db.define('platos', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(60),
    precio: Sequelize.STRING(60),
    identificadorUnico: Sequelize.STRING(60)
},{
    hooks:{
        beforeCreate(plato){
            plato.identificadorUnico = `${plato.nombre}-${shortid.generate()}`;
        }
    }
});

module.exports = Platos;