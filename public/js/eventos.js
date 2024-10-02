document.addEventListener("DOMContentLoaded", async function() {
    const eventosServices = new window.EventosServices();
    
    try {
        const response = await eventosServices.obterEventos();
        console.log('Eventos recebidos da API:', response);
        
        const eventList = document.getElementById('event-list');
        const eventos = response.eventos;

        if (Array.isArray(eventos)) {
            eventos.forEach(evento => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.innerHTML = `
                    <h2>${evento.nome}</h2>
                    <p>Descrição: ${evento.descricao}</p>
                    <p>Data: ${new Date(evento.dataevento).toLocaleDateString()}</p>
                    <p>Local: ${evento.local}</p>
                    <p>Preço: R$${evento.preco}</p>
                    <a href="/evento/${evento.id}">Ver Detalhes</a>
                    <a href="/evento/editar/${evento.id}" class="btn btn-primary">Editar</a>
                    <button class="btn btn-danger" id="excluir-${evento.id}">Excluir</button>
                `;
                eventList.appendChild(eventItem);

                // Função de exclusão para cada evento
                document.getElementById(`excluir-${evento.id}`).addEventListener('click', async () => {
                    try {
                        await eventosServices.excluirEvento(evento.id);
                        alert('Evento excluído com sucesso!');
                        location.reload(); // Recarrega a página para atualizar a lista de eventos
                    } catch (error) {
                        console.error('Erro ao excluir evento:', error);
                        alert('Erro ao excluir o evento. Tente novamente.');
                    }
                });
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
