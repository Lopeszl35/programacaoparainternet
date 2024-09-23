document.addEventListener('DOMContentLoaded', async () => {
    const eventosServices = new window.EventosServices();
    
    // Obter o ID do evento da URL (assume que o ID está no formato /evento/1)
    const eventId = window.location.pathname.split('/').pop();
    
    console.log('ID do evento:', eventId);

    if (eventId) {
        try {
            // Buscar os detalhes do evento pelo ID usando a API
            const response = await eventosServices.obterEventoPorId(eventId);
            const evento = response.evento; // Ajuste para acessar o objeto evento corretamente

            console.log('Resposta da API:', response);
            console.log('Detalhes do evento:', evento);

            if (!evento || Object.keys(evento).length === 0) {
                throw new Error('Evento não encontrado ou objeto vazio.');
            }

            // Verifica se as propriedades do objeto evento existem e são válidas
            const nome = evento.nome || 'Nome não disponível';
            const descricao = evento.descricao || 'Descrição não disponível';
            const local = evento.local || 'Local não disponível';
            const ingressosDisponiveis = evento.disponiveis || 0;
            
            // Converte o preço para número, garantindo que o campo existe
            const precoNumerico = parseFloat(evento.preco) || 0;

            // Tratar a data para evitar o "Invalid Date"
            const dataEvento = new Date(evento.dataevento);
            const dataFormatada = !isNaN(dataEvento) ? dataEvento.toLocaleDateString() : 'Data não disponível';

            // Atualizar o DOM com os dados do evento
            document.getElementById('eventName').innerText = nome;
            document.getElementById('eventDescription').innerText = `Descrição: ${descricao}`;
            document.getElementById('eventDate').innerText = `Data: ${dataFormatada}`;
            document.getElementById('eventLocation').innerText = `Local: ${local}`;
            document.getElementById('ingressosDisponiveis').innerText = `Ingressos Disponíveis: ${ingressosDisponiveis}`;
            document.getElementById('totalPrice').innerText = precoNumerico.toFixed(2);

            // Atualizar o formulário com os dados de preço e ingressos
            document.getElementById('ticketForm').dataset.price = precoNumerico;
            document.getElementById('ticketForm').dataset.ticketsavailable = ingressosDisponiveis;
            document.getElementById('quantity').max = ingressosDisponiveis;

            // Atualizar o valor total de acordo com a quantidade de ingressos escolhidos
            document.getElementById('quantity').addEventListener('input', function () {
                const quantity = parseInt(this.value);
                const totalPrice = precoNumerico * quantity;
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
