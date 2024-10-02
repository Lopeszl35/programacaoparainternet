
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
        document.getElementById('eventoForm').reset()
    } catch (error) {
        console.error('Erro ao adicionar evento:', error);
        alert('Erro ao adicionar evento.');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const eventosServices = new window.EventosServices();

    // Obter o ID do evento da URL (assume que o ID está no formato /evento/editar/1)
    const urlParams = window.location.pathname.split('/');
    const eventId = urlParams[urlParams.length - 1];

    if (eventId && urlParams.includes('editar')) {
        try {
            // Buscar os detalhes do evento pelo ID usando a API
            const response = await eventosServices.obterEventoPorId(eventId);
            const evento = response.evento;

            // Preencher o formulário com os dados do evento
            document.getElementById('nome').value = evento.nome;
            document.getElementById('descricao').value = evento.descricao;
            document.getElementById('data').value = new Date(evento.dataevento).toISOString().substring(0, 10);
            document.getElementById('local').value = evento.local;
            document.getElementById('preco').value = evento.preco;
            document.getElementById('tickets').value = evento.disponiveis;

            // Alterar o comportamento do botão "Salvar" para atualizar o evento
            document.getElementById('salvarEvento').addEventListener('click', async (e) => {
                e.preventDefault();

                const dadosAtualizados = {
                    nome: document.getElementById('nome').value,
                    descricao: document.getElementById('descricao').value,
                    dataevento: document.getElementById('data').value,
                    local: document.getElementById('local').value,
                    preco: parseFloat(document.getElementById('preco').value),
                    disponiveis: parseInt(document.getElementById('tickets').value),
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
            console.error('Erro ao obter os detalhes do evento para edição:', error);
        }
    } else {
        // Se não estiver no modo de edição, configurar o formulário para adicionar um novo evento
        document.getElementById('salvarEvento').addEventListener('click', async (e) => {
            e.preventDefault();

            const novoEvento = {
                nome: document.getElementById('nome').value,
                descricao: document.getElementById('descricao').value,
                dataevento: document.getElementById('data').value,
                local: document.getElementById('local').value,
                preco: parseFloat(document.getElementById('preco').value),
                disponiveis: parseInt(document.getElementById('tickets').value),
            };

            try {
                await eventosServices.adicionarEvento(novoEvento);
                alert('Evento adicionado com sucesso!');
                window.location.href = '/';
            } catch (error) {
                console.error('Erro ao adicionar evento:', error);
                alert('Erro ao adicionar evento. Tente novamente.');
            }
        });
    }
});
