document.getElementById('salvarEvento').addEventListener('click', async function(event) {
    const eventosServices = new window.EventosServices();
    event.preventDefault();
    const evento = {
        nome: document.getElementById('nome').value,
        dataevento: document.getElementById('data').value,
        local: document.getElementById('local').value,
        descricao: document.getElementById('descricao').value,
        preco: document.getElementById('preco').value,
        disponiveis: document.getElementById('tickets').value
    }

    try {
        await eventosServices.adicionarEvento(evento);
        alert('Evento adicionado com sucesso!');
        window.location.href = 'eventos.html';
    } catch (error) {
        console.error('Erro ao adicionar evento:', error);
        alert('Erro ao adicionar evento.');
    }
});