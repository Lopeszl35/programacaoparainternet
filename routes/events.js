import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Página Inicial' }); // Certifique-se de que você tem um arquivo 'index.ejs' em 'views'
});

router.get('/eventos', (req, res) => {
  res.render('eventos'); // Certifique-se de que você tem um arquivo 'eventos.ejs' em 'views'
});

export default router;
