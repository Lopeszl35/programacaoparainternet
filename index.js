import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bodyParser from 'body-parser';
import routes from './routes/routes.js'; 

const app = express();

// Configuração da sessão
app.use(session({
  secret: 'seu_segredo_aqui', 
  resave: false,
  saveUninitialized: true,
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuração da view engine e pasta estática
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir arquivos estáticos da pasta 'public'

// Configuração do Passport (Estratégia Local)
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === 'user' && password === 'password') {
      return done(null, { id: 1, username: 'user' });
    } else {
      return done(null, false, { message: 'Usuário ou senha inválidos.' });
    }
  }
));

// Serializar o usuário na sessão
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Desserializar o usuário a partir da sessão
passport.deserializeUser(function(id, done) {
  done(null, { id: 1, username: 'user' }); 
});

// Usar as rotas definidas no arquivo routes.js
app.use('/', routes);

// Inicialização do servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta http://localhost:3000');
});
