const Usuarios = require('../modelos/Usuarios');
const Platos = require('../modelos/Platos');
const Administradores = require('../modelos/Administradores');

const jwt = require('jwt-simple');
const moment = require('moment');
const { secret1 } = require('../../config/secret');
const Pedidos = require('../modelos/Pedidos');

exports.index = async (req, res) => {

    res.send({
        respuesta:'correcto',
        status: 200,
        mensaje: 'Bienvenido a Delilah Resto'
    });

}

exports.verUsuarios = async (req, res) => {
    const usuarios = await Usuarios.findAll();
    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){

        if(usuarios.length){
            res.send({
                respuesta: 'correcto',
                informacion: 'Se realizo correctamente la consulta',
                usuarios
            })
        }else{
            res.send({
                respuesta: 'error',
                informacion: 'No hay registros de usuarios'
            })
        }
    }else{

        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })

    }
}

exports.crearUsuarios = async (req, res, next) => {
    
    //validaciones

        const objeto = req.body;
    
        if(objeto.nombre === '' || objeto.apellido === '' || objeto.correo === '' || objeto.direccion === '' || objeto.telefono === '' || objeto.password === '' || objeto.usuario === ''){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Uno o mas campos vacios'
            })
        }else{
            
            const usuario = await Usuarios.create({
                usuario: objeto.usuario,
                nombre: objeto.nombre,
                apellido: objeto.apellido,
                correo: objeto.correo,
                direccion: objeto.direccion,
                telefono: objeto.telefono,
                password: objeto.password
            });
    
            if(usuario.dataValues){
                objeto.id = usuario.dataValues.id;
                res.status(200).send({
                    respuesta: 'correcto',
                    informacion: 'Se creo correctamente el usuario',
                    usuario: objeto
                })
            }else{
                res.status(404).send({
                    respuesta: 'error',
                    informacion: 'Ocurrio un error durante la operacion'
                })
            }
    
        }
}


exports.Autenticacion = async (req, res, next) => {
    const { headers } = req;

    if(!headers.token || headers.token === ''){

        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto las credenciales necesarias'
        })

    }else{

        const informacion = {
            tokenDecode: jwt.decode(headers.token, secret1),
            momentactual: moment().get('hour')
        };

        if(informacion.tokenDecode.tipo === 'usuario' || informacion.tokenDecode.tipo === 'admin'){

            

            if(informacion.tokenDecode.iat < informacion.momentactual){
    
                res.status(401).send({
                    respuesta: 'error',
                    informacion: 'Credenciales ya no son validas',
                    extra: 'necesita volver iniciar sesion'
                })
    
            }else{
                console.log(informacion);
                next();
            }

        }else{

            res.status(401).send({
                respuesta: 'error',
                informacion: 'No tienes los permisos necesarios'
            });

        }

    }
}

exports.verPlatos = async (req, res, next) => {
    const platos = await Platos.findAll();
    if(!platos.length){
        res.status(200).send({respuesta: 'correcto', informacion: 'No hay platos'})
    }else{
        res.status(200).send(platos);
    }
}

exports.crearPlatos = async (req, res, next) =>{
    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        const { nombre, precio } = req.body;
        if(nombre === '' || precio === ''){
            res.status(400).send({respuesta: 'error', informacion: 'Uno o mas campos vacios'})
        }else{
    
            const plato = await Platos.create({nombre: nombre, precio: precio});
    
            if(plato.dataValues){
                res.send(
                    {
                        respuesta: 'correcto',
                        informacion: 'Se creo correctamente el plato',
                        plato
                    }
                )
            }else{
                res.status(404).send({
                    respuesta: 'error',
                    informacion: 'Ocurrio un error durante la operacion'
                })
            }
    
        }
    }else{
        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })
    }
}

exports.verAdministradores = async (req, res, next) => {
    const administradores = await Administradores.findAll();
    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        if(!administradores.length){
            res.status(200).send({respuesta: 'correcto', informacion: 'No hay administradores'})
        }else{
            res.send(administradores);
        }
    }else{
        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })
    }
}

exports.crearAdministrador = async (req, res, next) => {
    const { usuario, password } = req.body;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){

        if(usuario === '' || password === ''){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Uno o mas campos vacios'
            });
        }else{
            const administrador = await Administradores.create({usuario: usuario, password: password});
    
            if(administrador.dataValues){
                res.status(200).send({
                    respuesta: 'correcto',
                    informacion: 'Se creo correctamente el administrador',
                    administrador
                });
            }else{
                res.status(404).send({
                    respuesta: 'error',
                    informacion: 'Ocurrio un error durante el proceso'
                });
            }
        }

    }else{
        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })
    }
}

exports.editarUsuario = async (req, res, next) => {
    const { usuario, password, nombre, apellido, correo, direccion, telefono } = req.body;
    const existente = req.params.usuario;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
    
        if(!existente){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se detecto el parametro necesario'
            });
        }else{
            if(nombre === '' || apellido === '' || correo === '' || direccion === '' || telefono === '' || password === '' || usuario === ''){
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'Uno o mas campos vacios'
                });
            }else{
    
                const encontrado = await Usuarios.findOne({where: {usuario: existente}});
    
                if(encontrado === null){
                    res.send({
                        respuesta: 'error',
                        informacion: 'Usuario no encontrado'
                    });
                }else{
                    const id = encontrado.dataValues.id;
                    
                    const resultado = await Usuarios.update(
                        {
                            usuario: usuario, 
                            password: password,
                            nombre: nombre,
                            apellido: apellido,
                            correo: correo,
                            direccion: direccion,
                            telefono: telefono
                        }, 
                        {
                            where:
                                {
                                    id: id
                                }
                        }
                    );
    
                    if(resultado.length > 0){
                        res.send({
                            respuesta: 'correcto',
                            informacion: 'Se actualizo correctamente el usuario'
                        })
                    }else{
                        res.send({
                            respuesta: 'error',
                            informacion: 'Ocurrio un error en la operacion'
                        })
                    }
                }
        
            }
        }
    }else{
        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })
    }

}

exports.eliminarUsuario = async (req, res, next) => {
    const { usuario } = req.params;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        if(!usuario){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Uno o mas campos vacios'
            });
        }else{
    
            const encontrado = await Usuarios.findOne({where:{usuario:usuario}});
    
            if(encontrado !== null){
                const id = encontrado.dataValues.id;
    
                const resultado = await Usuarios.destroy({where:{id:id}});
    
                if(resultado === 1){
                    res.status(200).send({
                        respuesta: 'correcto',
                        informacion: 'Se elimino correctamente el usuario'
                    });
                }else{
                    res.status(404).send({
                        respuesta: 'error',
                        informacion: 'Error en la operacion'
                    });
                }
    
            }else{
                res.status(200).send({
                    respuesta: 'error',
                    informacion: 'Usuario no encontrado'
                });
            }
    
        }
    }else{
        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })
    }

    

}

exports.actualizarPlato = async (req, res, next) => {
    const { plato } = req.params;
    const { nombre, precio } = req.body;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        if(!plato){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se detecto el parametro necesario'
            })
        }else{
            if(nombre === '' || precio === ''){
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'Uno o mas campos vacios'
                });
            }else{
    
                const encontrado = await Platos.findOne({where:{nombre:plato}})
    
                if(encontrado !== null){
    
                    const resultado = await Platos.update({nombre: nombre, precio: precio}, {where:{id:encontrado.dataValues.id}});
    
                    if(resultado.length > 0){
                        res.send({
                            respuesta: 'correcto',
                            informacion: 'Se actualizo correctamente el plato'
                        })
                    }else{
                        res.send({
                            respuesta: 'error',
                            informacion: 'Ocurrio un error en la operacion'
                        })
                    }
    
                }else{
                    res.send({
                        respuesta: 'error',
                        informacion: 'Plato no encontrado'
                    });
                }
    
            }
        }
    }else{
        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })
    }
    
    


}

exports.eliminarPlato  = async (req,res,next) => {
    const { nombre } = req.params;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        if(!nombre){

            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se detecto el parametro requerido'
            });
    
        }else{
    
            if(nombre === ''){
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'Uno o mas campos vacios'
                });
            }else{
    
                const resultado = await Platos.destroy({where:{nombre: nombre}});
    
                if(resultado === 1){
                    res.status(200).send({
                        respuesta: 'correcto',
                        informacion: 'Se elimino correctamente el plato'
                    });
                }else{
                    res.status(400).send({
                        respuesta: 'error',
                        informacion: 'No se encontro el plato'
                    });
                }
    
            }
    
        }
    }else{

        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })

    }

    

}

exports.buscarUsuarios = async (req, res, next) => {
    const { usuario } = req.params;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    
        
        if(!usuario){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se detecto el parametro requerido'
            });
        }else{

            if(usuario === ''){
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'Uno o mas campos vacios'
                });
            }else{
                const resultado = await Usuarios.findOne({where:{usuario: usuario}});
                console.log(resultado);
                if(resultado === null){
                    res.send({
                        respuesta: 'error',
                        informacion: 'Usuario no encontrado'
                    });
                }else{
                    res.send({
                        respuesta: 'correcto',
                        informacion: 'Se encontro correctamente el usuario',
                        resultado
                    });
                }
            }

        }
    

}

exports.busquedaUsuariosId= async (req, res, next) => {
    const { id } = req.params;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        
        if(!id){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se detecto el parametro requerido'
            });
        }else{

            if(id === ''){
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'El campo requerido esta vacio'
                });
            }else{

                const usuario = await Usuarios.findOne({where:{id: id}});

                if(usuario !== null){
                    res.send({
                        respuesta: 'correcto',
                        informacion: 'Se encontro el usuario correctamente',
                        usuario
                    })
                }else{
                    res.send({
                        respuesta: 'error',
                        informacion: 'No se encontro un usuario con ese id'
                    });
                }

            }

        }
    }else{

        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })

    }

}

exports.inicioSesion = async (req, res, next) => {

    const { usuario, password } = req.body;

    if(usuario === undefined || password === undefined){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los campos requeridos'
        });
    }else{
        if(usuario === '' || password === ''){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Uno o mas campos estan vacios'
            });
        }else{

            const resultado = await Usuarios.findOne({
                where:{
                    usuario: usuario
                }
            });

            if(resultado !== null){
                if(resultado.password === password){

                    const payload = {
                        id: resultado.id,
                        usuario: resultado.nombre,
                        tipo: 'usuario',
                        iat: moment().get('hour')
                        
                    }

                    const token = jwt.encode(payload, secret1);

                    res.send({
                        respuesta: 'correcto',
                        informacion: 'Inicio sesion correctamente',
                        resultado,
                        token
                    });


                }else{ 
                    res.send({
                        respuesta: 'error',
                        informacion: 'El password no coincide'
                    })
                }
            }else{

                res.send({
                    respuesta: 'error',
                    informacion: 'No se encontro el usuario'
                })

            }

        }
    }

    

}

exports.inicioSesionAdministrador = async (req, res, next) => {
    const { usuario, password } = req.body;

    if(usuario === undefined || password === undefined){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los campos requeridos'
        });
    }else{
        if(usuario === '' || password === ''){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'Uno o mas campos estan vacios'
            });
        }else{

            const resultado = await Administradores.findOne({
                where:{
                    usuario: usuario
                }
            });

            if(resultado !== null){
                if(resultado.password === password){

                    const payload = {
                        id: resultado.id,
                        usuario: resultado.usuario,
                        tipo: 'admin',
                        iat: moment().get('hour')
                        
                    }

                    const token = jwt.encode(payload, secret1);

                    res.send({
                        respuesta: 'correcto',
                        informacion: 'Inicio sesion correctamente',
                        resultado,
                        token
                    });


                }else{ 
                    res.send({
                        respuesta: 'error',
                        informacion: 'El password no coincide'
                    })
                }
            }else{

                res.send({
                    respuesta: 'error',
                    informacion: 'No se encontro el administrador'
                })

            }

        }
    }
    
}

exports.buscarUsuariosIds = async (req, res, next) => {
    const { ids } = req.body;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        

        if(!ids){

            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se detecto los campos necesarios'
            });


        }else{

            const identificadores = JSON.parse(ids);

            if(identificadores.length){

                let usuarios = [];

                
                identificadores.forEach(async id => {

                    const usuario = await Usuarios.findOne({where:{id: parseInt(id)}});

                    if(usuario !== null){

                        usuarios.push(usuario);

                    }

                });

                setTimeout(() => {
                    if(usuarios.length > 0){

                        res.send({
                            respuesta: 'correcto',
                            informacion: 'Se encontro correctamente los siguientes usuarios',
                            usuarios
                        })
        
                    }else{
        
                        res.send({
                            respuesta: 'error',
                            informacion: 'No se encontro ningun usuario'
                        })
        
                    }
                }, 200);
            }else{
        
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'El campo esta vacio'
                });
        
            }

        }
    }else{

        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'    
        })

    }


}

exports.verPedidos = async (req, res, next) => {

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){

        const pedidos = await Pedidos.findAll();

        if(!pedidos.length){

            res.send({
                respuesta: 'error',
                pedidos: 'No hay pedidos registrados'
            });

        }else{
            
            let datos = [];

            pedidos.forEach(async pedido => {
                console.log(pedido.id_usuario);

                const data = {
                    id: pedido.id,
                    descripcion: JSON.parse(pedido.descripcion),
                    estado: pedido.estado,
                    fecha: pedido.fecha,
                    hora: pedido.hora,
                    numero: pedido.numero,
                    total: pedido.total
                }

                
                if(pedido.tipo === 1){
                    data.tipo = 'Efectivo'
                }else{
                    data.tipo = 'Credito o Debito'
                }

                const usuario = await Usuarios.findOne({where:{id: pedido.id_usuario}});

                data.nombre_usuario = usuario.nombre;
                data.direccion = usuario.direccion;
                data.correo = usuario.correo;
                data.telefno = usuario.telefeno;

                datos.push(data);

            });

            setTimeout(() => {
                res.send({
                    respuesta: 'correcto',
                    datos
                });
            }, 200);

        }

    }else if(tokenDecode.tipo === 'usuario'){

        const pedidos = await Pedidos.findAll({where:{id_usuario: tokenDecode.id}});

        if(pedidos.length){

            let datos = [];

            pedidos.forEach(async pedido => {

                const data = {
                    id: pedido.id,
                    descripcion: JSON.parse(pedido.descripcion),
                    estado: pedido.estado,
                    fecha: pedido.fecha,
                    hora: pedido.hora,
                    numero: pedido.numero,
                    total: pedido.total
                }

                
                if(pedido.tipo === 1){
                    data.tipo = 'Efectivo'
                }else{
                    data.tipo = 'Credito o Debito'
                }

                const usuario = await Usuarios.findOne({where:{id: pedido.id_usuario}});

                data.nombre_usuario = usuario.nombre;
                data.direccion = usuario.direccion;
                data.correo = usuario.correo;
                data.telefno = usuario.telefeno;

                datos.push(data);

            })

            setTimeout(() => {
                res.send({
                    respuesta: 'correcto',
                    datos
                })
            }, 200);

        }else{

            res.send({
                respuesta: 'correcto',
                informacion: 'No se tiene registrado ningun pedido'
            });

        }

    }

}

exports.crearPedido = async (req, res, next) => {

    const { id_usuario, descripcion, tipo_pago, total } = req.body;

    if(!id_usuario || !descripcion || !tipo_pago || !total){

        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detectaron los campos necesarios'
        });

    }else{

        if(id_usuario === '' || descripcion === '' || tipo_pago === '' || total === ''){

            res.status(400).send({
                respuesta: 'error',
                informacion: 'Uno o mas campos estan vacios'
            });

        }else{

            const resultado = await Usuarios.findOne({where:{id: id_usuario}});

            if(resultado !== null){

                const pedido = await Pedidos.create({id_usuario: id_usuario, descripcion: descripcion, tipo: tipo_pago, total: total});
    
                if(pedido.dataValues){
    
                    const numero = await Pedidos.update(
                        {
                            numero: `#${pedido.id}`
                        }, 
                        {
                            where:
                                {
                                    id: pedido.id
                                }
                        }
                    )
    
                    res.send({
                        respuesta: 'correcto',
                        informacion: 'Se creo correctamente el pedido',
                        pedido
                    });
    
                }else{
                    res.status(404).send({
                        respuesta: 'error',
                        informacion: 'Ocurrio un error durante el proceso'
                    })
                }
            }else{

                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'No se encontro el usuario ingresado para crear un pedido'
                })

            }
        }


    }


}

exports.editarPedido = async (req, res, next) => {

    const { id_pedido } = req.params;
    const { estado } = req.body;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        if(!id_pedido){
            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se detecto el parametro necesario'
            });
        }else{
    
            if(estado === ''){
    
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'Uno o mas campos estan vacios'
                });
    
            }else{
    
    
                const encontrado = await Pedidos.findOne({where:{id: id_pedido}})
    
                if(encontrado !== null){
    
                    const resultado = await Pedidos.update({estado: estado}, {where: {id: id_pedido}});
    
                    if(resultado.length > 0){
    
                        res.send({
                            respuesta: 'correcto',
                            informacion: 'Se edito correctamente el pedido'
                        });
    
                    }else{
    
                        res.send({
                            respuesta: 'error',
                            informacion: 'Ocurrio un error durante el proceso'
                        });
    
                    }
    
                }else{
    
                    res.status(400).send({
                        respuesta: 'error',
                        informacion: 'No se encontro un pedido con ese id'
                    });
    
                }
    
    
            }
    
        }
    }else{

        res.status(401).send({
            respuesta: 'error', 
            informacion: 'No tienes los permisos necesarios'
        })

    }

    

}

exports.verPedido = async (req, res, next) => {

    const { id } = req.params;

    if(!id){

        res.status(400).send({
            respuesta: 'error',
            informacion: 'No se detecto los parametros necesarios'
        });

    }else{

        if(id == ''){

            res.status(400).send({
                respuesta: 'error',
                informacion: 'El parametro esta vacio'
            });
            
        }else{

            const pedido = await Pedidos.findOne({where:{id : id}});

            if(pedido !== null){

                const data = {
                    id: pedido.id,
                    descripcion: JSON.parse(pedido.descripcion),
                    estado: pedido.estado,
                    fecha: pedido.fecha,
                    hora: pedido.hora,
                    numero: pedido.numero,
                    total: pedido.total
                }

                
                if(pedido.tipo === 1){
                    data.tipo = 'Efectivo'
                }else{
                    data.tipo = 'Credito o Debito'
                }

                const usuario = await Usuarios.findOne({where:{id: pedido.id_usuario}});

                data.nombre_usuario = usuario.nombre;
                data.direccion = usuario.direccion;
                data.correo = usuario.correo;
                data.telefno = usuario.telefeno;

                res.send({
                    respuesta: 'correcto',
                    informacion: 'Se encontro correctamente el pedido',
                    data
                })

            }else{

                res.send({
                    respuesta: 'error',
                    informacion: 'No se encontro el pedido con ese usuario'
                })

            }


        }

    }

}

exports.editarAdministradores = async (req, res, next) => {
    const { id } = req.params;
    const { usuario, password } = req.body;

    const { token } = req.headers;

    const tokenDecode = jwt.decode(token, secret1);

    if(tokenDecode.tipo === 'admin'){
        if(!id){

            res.status(400).send({
                respuesta: 'error',
                informacion: 'No se detecto los parametros necesarios'
            })

        }else{

            if(id === '' || usuario === '' || password === ''){
                res.status(400).send({
                    respuesta: 'error',
                    informacion: 'El parametro o campos estan vacios'
                })
            }else{

                

                const encontrado = await Administradores.findOne({where:{id: id}});

                if(encontrado !== null){

                    const resultado = await Administradores.update({usuario: usuario, password: password}, {where: {id: id}});

                    if(resultado.length > 0){
        
                        res.send({
                            respuesta: 'correcto',
                            informacion: 'Se edito correctamente el administrador'
                        });

                    }else{

                        res.send({
                            respuesta: 'error',
                            informacion: 'Ocurrio un error durante el proceso'
                        });

                    }

                }else{

                    res.send({
                        respuesta: 'error',
                        informacion: 'No se encontro el administrador ingresado'
                    })

                }


            }

        }
    }else{

        res.status(401).send({
            respuesta: 'error',
            informacion: 'No tienes los permisos necesarios'
        })

    }
}

exports.noRepetidos = async (req, res, next) => {

    const { usuario, correo } = req.body;

    if(!usuario || !correo){

        res.status(400).send({
            respuesta: 'error',
            informacion: 'No existe los campos necesarios'
        });

    }

    if(usuario === '' || correo === ''){
        res.status(400).send({
            respuesta: 'error',
            informacion: 'Uno o mas campos estan vacios'
        });
    }else{

        const encontrado = await Usuarios.findOne({

            where:{
                usuario: usuario
            }

        });

        if(encontrado !== null){

            res.send({
                respuesta: 'error',
                informacion: 'Ya existe este usuario ... '
            })

        }else{

            next();

        }


    }



}