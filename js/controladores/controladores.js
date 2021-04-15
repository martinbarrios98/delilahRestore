const Usuarios = require('../modelos/Usuarios');
const Platos = require('../modelos/Platos');
const Administradores = require('../modelos/Administradores');

exports.index = async (req, res) => {

    res.send({
        respuesta:'correcto',
        status: 200,
        mensaje: 'Bienvenido a Delilah Resto'
    });

}

exports.verUsuarios = async (req, res) => {
    const usuarios = await Usuarios.findAll();
    res.status(200).send(usuarios);
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
    console.log('Aqui verficamos sesion');
    next();
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
}

exports.verAdministradores = async (req, res, next) => {
    const administradores = await Administradores.findAll();
    if(!administradores.length){
        res.status(200).send({respuesta: 'correcto', informacion: 'No hay administradores'})
    }else{
        res.send(administradores);
    }
}

exports.crearAdministrador = async (req, res, next) => {
    const { usuario, password } = req.body;

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
}

exports.editarUsuario = async (req, res, next) => {
    const { usuario, password, nombre, apellido, correo, direccion, telefono } = req.body;
    const existente = req.params.usuario;
    
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

}

exports.eliminarUsuario = async (req, res, next) => {
    const { usuario } = req.params;

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

}

exports.actualizarPlato = async (req, res, next) => {
    const { plato } = req.params;
    const { nombre, precio } = req.body;
    
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


}

exports.eliminarPlato  = async (req,res,next) => {
    const { nombre } = req.params;

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

}

exports.buscarUsuarios = async (req, res, next) => {
    const { usuario } = req.params;

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