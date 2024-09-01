const DataBase = require('../database');

const database = new DataBase();

class Evento {
    constructor(dataevento, local, descricao, preco, disponiveis) {
        this.dataevento = dataevento;
        this.local = local;
        this.descricao = descricao;
        this.preco = preco;
        this.disponiveis = disponiveis; 
    }

    async adicionarEvento(dadosEventos) {
        const sql = 'INSERT INTO evento (dataevento, local, descricao, preco, disponiveis) VALUES (?, ?, ?, ?, ?)';
        const params = [
            dadosEventos.dataevento, 
            dadosEventos.local, 
            dadosEventos.descricao, 
            dadosEventos.preco, 
            dadosEventos.disponiveis
        ];
        return await database.executaComandoNonQuery(sql, params);
    }
}

module.exports = Evento;
