const express =require('express');
const engine = require ('ejs-mate');
const path = require('path');
const passport = require ('passport');
const session = require('express-session');
const flash = require('connect-flash');


//inicializaciones
const app=express();
require('./baseDeDatos');
require('./passport/aut-local_usuario');


//configuracion del servidor
app.set('views',path.join(__dirname, 'views'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('port', process.env.PORT||80);

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));    
app.use(flash());
 app.use(passport.initialize());
 app.use(passport.session());
 


//variables locales
app.use((req, res, next) => {
    app.locals.registroMensaje = req.flash('registroMensaje');
    app.locals.inicioSesionMensaje =req.flash('inicioSesionMensaje');
    app.locals.user = req.user || null;
    console.log(app.locals);
    next();    
});

//pendientes


//rutas
app.use('/',require('./routes/rutasUsuario'));


//rutas estaticas
app.use(express.static(path.join('src')));
app.use(express.static(path.join(__dirname,'registroServiceWorker.js')));//Ver que onda con esta parte
app.use(express.static(path.join(__dirname, 'public')));


//iniciador del servidor
app.listen(app.get('port'),()=>{
    console.log('SERVIDOR CORRIENDO EN EL PUERTO ', app.get('port'));
    
});




