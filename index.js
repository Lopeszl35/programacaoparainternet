import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import eventRoutes from './routes/events.js';

const app = express();

// Configuração da sessão
app.use(session({
  secret: 'seu_segredo_aqui',
  resave: false,
  saveUninitialized: true,
}));

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurações do Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota de login
app.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { error });
});

// Autenticação de login
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login?error=' + encodeURIComponent(info.message));
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

// Função para garantir que o usuário está autenticado
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Uso das rotas
app.use('/', ensureAuthenticated, eventRoutes);
app.use('/eventos', eventRoutes);

// Configuração do Passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === 'user' && password === 'password') {
      return done(null, { id: 1, username: 'user' });
    } else {
      return done(null, false, { message: 'Usuário ou senha inválidos.' });
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, { id: 1, username: 'user' });
});

// Inicialização do servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta http://localhost:3000');
});
