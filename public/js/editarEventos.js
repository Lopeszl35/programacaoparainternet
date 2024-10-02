document.addEventListener('DOMContentLoaded', async () => {
    const eventosServices = new window.EventosServices();

    // Obter o ID do evento da URL (formato /evento/editar/:id)
    const eventId = window.location.pathname.split('/').pop();

    if (eventId) {
        try {
            // Buscar os detalhes do evento pelo ID para preencher o formulário
            const response = await eventosServices.obterEventoPorId(eventId);
            const evento = response.evento; 

            // Preencher o formulário com os dados do evento
            document.getElementById('nome').value = evento.nome;
            document.getElementById('descricao').value = evento.descricao;
            document.getElementById('data').value = evento.dataevento.split('T')[0]; 
            document.getElementById('local').value = evento.local;
            document.getElementById('preco').value = evento.preco;
            document.getElementById('tickets').value = evento.disponiveis;

            // Atualizar evento ao enviar o formulário
            document.getElementById('salvarEvento').addEventListener('click', async function (event) {
                event.preventDefault();

                // Dados atualizados do formulário
                const dadosAtualizados = {
                    id: eventId,
                    nome: document.getElementById('nome').value,
                    descricao: document.getElementById('descricao').value,
                    dataevento: document.getElementById('data').value,
                    local: document.getElementById('local').value,
                    preco: document.getElementById('preco').value,
                    disponiveis: document.getElementById('tickets').value
                };

                try {
                    await eventosServices.atualizarEvento(dadosAtualizados, eventId);
                    alert('Evento atualizado com sucesso!');
                    window.location.href = '/'; 
                } catch (error) {
                    console.error('Erro ao atualizar o evento:', error);
                    alert('Erro ao atualizar o evento. Tente novamente.');
                }
            });

        } catch (error) {
            console.error('Erro ao carregar os detalhes do evento:', error);
            alert('Erro ao carregar os detalhes do evento.');
        }
    } else {
        alert('ID do evento não encontrado na URL.');
    }
});
