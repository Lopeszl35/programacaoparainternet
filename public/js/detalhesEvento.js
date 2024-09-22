document.addEventListener('DOMContentLoaded', async () => {
    const eventosServices = new window.EventosServices();

    // Obter o ID do evento da URL (assume que o ID está como um parâmetro de query string, por exemplo: ?id=1)
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');  // Obtém o ID do evento da URL

    if (eventId) {
        try {
            // Buscar os detalhes do evento pelo ID usando a API
            const evento = await eventosServices.obterEventoPorId(eventId);

            // Atualizar o DOM com os dados do evento
            document.getElementById('eventName').innerText = evento.nome;
            document.getElementById('eventDescription').innerText = `Descrição: ${evento.descricao}`;
            document.getElementById('eventDate').innerText = `Data: ${new Date(evento.dataevento).toLocaleDateString()}`;
            document.getElementById('eventLocation').innerText = `Local: ${evento.local}`;
            document.getElementById('ingressosDisponiveis').innerText = `Ingressos Disponíveis: ${evento.disponiveis}`;
            document.getElementById('totalPrice').innerText = evento.preco.toFixed(2);

            // Atualizar o formulário com os dados de preço e ingressos
            document.getElementById('ticketForm').dataset.price = evento.preco;
            document.getElementById('ticketForm').dataset.ticketsavailable = evento.disponiveis;
            document.getElementById('quantity').max = evento.disponiveis;

            // Atualizar o valor total de acordo com a quantidade de ingressos escolhidos
            document.getElementById('quantity').addEventListener('input', function () {
                const quantity = parseInt(this.value);
                const totalPrice = evento.preco * quantity;
                document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
            });
        } catch (error) {
            console.error('Erro ao obter o evento:', error);
            alert('Erro ao carregar os detalhes do evento.');
        }
    } else {
        alert('ID do evento não encontrado na URL.');
    }
});
