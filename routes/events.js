import express from 'express';
const router = express.Router();

// Renderiza a página inicial
router.get('/', (req, res) => {
  res.render('eventos', { title: 'Página Inicial' });
});

// Renderiza a página que lista todos os eventos
router.get('/cadastrarevento', (req, res) => {
  res.render('formularioEventos');
});

// Renderiza a página para editar evento (Coloque essa rota antes da rota /evento/:id)
router.get('/evento/editar/:id', (req, res) => {
  res.render('editarEventos');
});

// Renderiza a página de detalhes do evento sem os dados
router.get('/evento/:id', (req, res) => {
  res.render('detalhesEvento'); 
});

export default router;
