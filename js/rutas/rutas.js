const express = require('express');

const rutas = express.Router();

const { body } = require('express-validator/check');

const controladores = require('../controladores/controladores');

module.exports = () => {

    //Principal
    rutas.get('/', controladores.index);
    //Usuarios
    rutas.get('/usuarios', controladores.Autenticacion, controladores.verUsuarios);
    rutas.post(`/usuarios/nuevo`, body(['usuario','nombre', 'apellido', 'correo', 'direccion', 'telefono', 'password']).not().isEmpty().trim(),controladores.noRepetidos ,controladores.crearUsuarios);
    rutas.put(`/usuarios/:usuario`, body(['usuario','nombre', 'apellido', 'correo', 'direccion', 'telefono', 'password']).not().isEmpty().trim() ,controladores.Autenticacion, controladores.editarUsuario);
    rutas.delete('/usuarios/delete/:usuario', controladores.Autenticacion, controladores.eliminarUsuario);
    rutas.post('/usuarios/sesion',  body(['usuario', 'password']).not().isEmpty().trim(),controladores.inicioSesion);
    //Platos
    rutas.get('/platos', controladores.Autenticacion ,controladores.verPlatos);
    rutas.post('/platos/nuevo', body(['nombre', 'precio']).not().isEmpty().trim().escape() ,controladores.Autenticacion, controladores.crearPlatos);
    rutas.put('/platos/:plato', body(['nombre', 'precio']).not().isEmpty().trim().escape() ,controladores.Autenticacion, controladores.actualizarPlato);
    rutas.delete('/platos/delete/:nombre', controladores.Autenticacion, controladores.eliminarPlato);
    //Administradores
    rutas.get('/administradores', controladores.Autenticacion, controladores.verAdministradores);
    rutas.post('/administradores/nuevo', body(['usuario', 'password']).not().isEmpty().trim(), controladores.Autenticacion, controladores.crearAdministrador);
    rutas.post('/administradores/sesion', body(['usuario', 'password']).not().isEmpty().trim(), controladores.inicioSesionAdministrador);
    rutas.put('/administradores/:id', body(['usuario', 'password']).not().isEmpty().trim() ,controladores.Autenticacion, controladores.editarAdministradores);
    //pedidos
    rutas.get('/pedidos', controladores.Autenticacion, controladores.verPedidos);
    rutas.post('/pedidos/nuevo', body(['id_usuario', 'descripcion', 'tipo_pago', 'total']).not().isEmpty().trim(), controladores.Autenticacion, controladores.crearPedido);
    rutas.put('/pedidos/:id_pedido',body(['estado']).not().isEmpty().trim() ,controladores.Autenticacion, controladores.editarPedido);
    //buscadores
    rutas.get('/usuarios/buscar/:usuario', controladores.Autenticacion, controladores.buscarUsuarios);
    rutas.get('/usuarios/:id', controladores.Autenticacion, controladores.busquedaUsuariosId);
    rutas.post('/usuarios/buscador', body(['ids']) ,controladores.Autenticacion, controladores.buscarUsuariosIds);
    rutas.get('/pedidos/:id', controladores.Autenticacion, controladores.verPedido);
    return rutas;

};