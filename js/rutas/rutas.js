const express = require('express');

const rutas = express.Router();

const { body } = require('express-validator/check');

const controladores = require('../controladores/controladores');

module.exports = () => {

    //Principal
    rutas.get('/', controladores.index);
    //Usuarios
    rutas.get('/usuarios', controladores.Autenticacion, controladores.verUsuarios);
    rutas.post(`/usuarios/nuevo`, body(['usuario','nombre', 'apellido', 'correo', 'direccion', 'telefono', 'password']).not().isEmpty().trim().escape(),controladores.crearUsuarios);
    rutas.put(`/usuarios/:usuario`, body(['usuario','nombre', 'apellido', 'correo', 'direccion', 'telefono', 'password']).not().isEmpty().trim().escape() ,controladores.Autenticacion, controladores.editarUsuario);
    rutas.delete('/usuarios/delete/:usuario', controladores.Autenticacion, controladores.eliminarUsuario);
    //Platos
    rutas.get('/platos', controladores.Autenticacion ,controladores.verPlatos);
    rutas.post('/platos/nuevo', body(['nombre', 'precio']).not().isEmpty().trim().escape() ,controladores.Autenticacion, controladores.crearPlatos);
    rutas.put('/platos/:plato', body(['nombre', 'precio']).not().isEmpty().trim().escape() ,controladores.Autenticacion, controladores.actualizarPlato);
    rutas.delete('/platos/delete/:nombre', controladores.Autenticacion, controladores.eliminarPlato);
    //Administradores
    rutas.get('/administradores', controladores.Autenticacion, controladores.verAdministradores);
    rutas.post('/administradores/nuevo', body(['usuario', 'password']).not().isEmpty().trim().escape(), controladores.Autenticacion, controladores.crearAdministrador);

    //buscadores
    rutas.get('/usuarios/buscar/:usuario', controladores.Autenticacion, controladores.buscarUsuarios);
    return rutas;

};