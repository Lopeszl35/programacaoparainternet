document.addEventListener("DOMContentLoaded", async function() {
    const eventosServices = new window.EventosServices();
    try {
        const response = await eventosServices.obterEventos();
        
        
        console.log('Eventos recebidos da API:', response);
        
        const eventList = document.getElementById('event-list');
        
        const eventos = response.eventos;

        if (Array.isArray(eventos)) {
            eventos.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.innerHTML = `
                    <h2>${event.nome}</h2>
                    <p>Descricão: ${event.descricao}</p>
                    <p>Data: ${new Date(event.dataevento).toLocaleDateString()}</p>
                    <p>Local: ${event.local}</p>
                    <p>Preço: R$${event.preco}</p>
                    <a href="/evento/${event.id}">Ver Detalhes</a>
                `;
                eventList.appendChild(eventItem);
            });
        } else {
            console.error('A resposta da API não é um array:', eventos);
            eventList.innerHTML = '<p>Erro ao carregar eventos: resposta inválida.</p>';
        }
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        document.getElementById('event-list').innerHTML = '<p>Erro ao carregar eventos.</p>';
    }
});
