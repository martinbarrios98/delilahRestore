const { Sequelize } = require('sequelize');
const db = require('../../config/db');

const Pedidos = db.define('pedidos', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: Sequelize.INTEGER,
    descripcion: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(6),
    fecha: Sequelize.STRING,
    hora: Sequelize.STRING,
    numero: Sequelize.STRING,
    tipo: Sequelize.INTEGER(2),
    total: Sequelize.STRING,
}, {
    hooks:{
        beforeCreate(pedidos){
            const date = new Date();
            const hora = date.getHours();
            const minutos = date.getMinutes();
            const dia = date.getDate();
            const mes = date.getMonth();
            const year = date.getFullYear();

            pedidos.fecha = `${dia}/${mes}/${year}`;
            pedidos.hora = `${hora}:${minutos}`;
            pedidos.estado = 1;
        }
    }
});

module.exports = Pedidos;