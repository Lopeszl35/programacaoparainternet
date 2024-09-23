import DataBase from '../database.js';

const database = new DataBase();

class EventoModel {
    constructor(nome, dataevento, local, descricao, preco, disponiveis) {
        this.nome = nome;
        this.dataevento = dataevento;
        this.local = local;
        this.descricao = descricao;
        this.preco = preco;
        this.disponiveis = disponiveis; 
    }

    async adicionarEvento(dadosEventos) {
        try {
            const result = await database.executaComandoNonQuery('INSERT INTO evento SET ?', [dadosEventos]);
            return result;
        } catch (error) {
            console.error('Erro ao executar comando SQL:', error);
            throw error;
        }
    }

    async obterEventos() {
        try {
            const rows = await database.executaComando('SELECT * FROM evento');
            return rows;
        } catch (error) {
            console.error('Erro ao obter eventos:', error);
            throw error;
        }
    }

    async obterEventoId(id) {
        try {
            const rows = await database.executaComando('SELECT * FROM evento WHERE id = ?', [id]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                throw new Error('Evento não encontrado');
            }
        } catch (error) {
            console.error('Erro ao obter evento:', error);
            throw error;
        }
    }

    async excluirEvento(id) {
        try {
            const result = await database.executaComandoNonQuery('DELETE FROM evento WHERE id = ?', [id]);
            return result;
        } catch (error) {
            console.error('Erro ao executar comando SQL:', error);
            throw error;
        }
    }

    async atualizarEvento(id, dadosEventos) {
        try {
            const result = await database.executaComandoNonQuery('UPDATE evento SET ? WHERE id = ?', [dadosEventos, id]);
            return result;
        } catch (error) {
            console.error('Erro ao executar comando SQL:', error);
            throw error;
        }
    }

}

export default EventoModel;
