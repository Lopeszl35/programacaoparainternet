import express from 'express';
import EventoController from '../controllers/eventController.js';

const router = express.Router();
const eventoController = new EventoController();

router.get('/eventos/:id', eventoController.obterEventoId);
router.get('/eventos', eventoController.obterEventos);
router.post('/eventos', eventoController.adicionarEvento);
router.put('/eventos/:id', eventoController.atualizarEvento);
router.delete('/eventos/:id', eventoController.excluirEvento);


export default router;