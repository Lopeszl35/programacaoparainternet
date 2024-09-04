import EventoModel from '../model/Entities/Eventos.js';
import { validationResult } from 'express-validator';

const eventoModel = new EventoModel();

class EventoController {
  async adicionarEvento(req, res) {
    console.log('Recebendo requisição para adicionar evento...');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Erro de validação:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { dataevento, local, descricao, preco, disponiveis } = req.body;
    console.log('Dados recebidos:', { dataevento, local, descricao, preco, disponiveis });

    const evento = new EventoModel(dataevento, local, descricao, preco, disponiveis);

    try {
      console.log('Tentando adicionar evento ao banco de dados...');
      await eventoModel.adicionarEvento(evento);
      console.log('Evento adicionado com sucesso!');
      return res.status(201).json({ message: 'Evento adicionado com sucesso!' });
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
      return res.status(500).json({ message: 'Erro ao adicionar evento.' });
    }
  }

  async atualizarEvento(req, res) {
    console.log('Recebendo requisição para atualizar evento...');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Erro de validação:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, dataevento, local, descricao, preco, disponiveis } = req.body;
    console.log('Dados recebidos:', { id, dataevento, local, descricao, preco, disponiveis });

    const evento = new EventoModel(dataevento, local, descricao, preco, disponiveis);

    try {
      console.log('Tentando atualizar evento no banco de dados...');
      await eventoModel.atualizarEvento(id, evento);
      console.log('Evento atualizado com sucesso!');
      return res.status(200).json({ message: 'Evento atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      return res.status(500).json({ message: 'Erro ao atualizar evento.' });
    }

  }

  async obterEventos(req, res) {
    console.log('Recebendo requisição para obter eventos...');
    try {
      const eventos = await eventoModel.obterEventos();
      console.log('Eventos obtidos:', eventos);
      return res.status(200).json({ eventos });
    } catch (error) {
      console.error('Erro ao obter eventos:', error);
      return res.status(500).json({ message: 'Erro ao obter eventos.' });
    }
  }

  async obterEventoId(req, res) {
    const id = req.params.id;
    try {
      const evento = await eventoModel.obterEventoId(id);
      console.log('Evento obtido:', evento);
      if(Object.keys(evento).length === 0) {
        return res.status(404).json({ message: 'Evento não encontrado.' });
      }
      return res.status(200).json({ evento });
    } catch (error) {
      console.error('Erro ao obter evento:', error);
      return res.status(500).json({ message: 'Erro ao obter evento.' });
    }
  }

  async excluirEvento(req, res) {
    console.log('Recebendo requisição para excluir evento...');
    const id = req.params.id;
    try {
      await eventoModel.excluirEvento(id);
      console.log('Evento excluído com sucesso!');
      return res.status(200).json({ message: 'Evento excluído com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      return res.status(500).json({ message: 'Erro ao excluir evento.' });
    }
  }


}

export default EventoController;
