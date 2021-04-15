const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../js/modelos/Usuarios');


passport.use(
    new LocalStrategy(
        {
            usernameField: 'correo',
            passwordField: 'password'
        },
        async (correo, password, done) => {
            try {
                const usuario =  await Usuarios.find({
                    where:{correo: correo}
                })
            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
)