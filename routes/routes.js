import express from 'express';
import passport from 'passport';
import eventRoutes from './events.js'; // Certifique-se de que você incluiu .js na extensão

const router = express.Router();

// Função middleware para verificar se o usuário está autenticado
export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Rota de login
router.get('/login', (req, res) => {
  const error = req.query.error; // Passa erros de autenticação para o frontend
  res.render('login', { error });
});

// Rota de login POST para autenticação
router.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Redireciona para a página principal ao fazer login com sucesso
  failureRedirect: '/login?error=Usuário ou senha inválidos' // Redireciona para login com erro
}));

// Usar as rotas de eventos e aplicar o middleware de autenticação
router.use('/', ensureAuthenticated, eventRoutes);
router.use('/eventos', eventRoutes); 

export default router;
