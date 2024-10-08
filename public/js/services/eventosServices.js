const API_BASE_URL = 'http://localhost:3001';

class EventosServices {
    async obterEventos() {
       const response = await fetch(`${API_BASE_URL}/eventos`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       });

       if(!response.ok) {
           throw new Error('Erro ao obter eventos');
       } else {
           const eventos = await response.json();
           return eventos;
       }

    }

    async adicionarEvento(dadosEvento) {
        const response = await fetch(`${API_BASE_URL}/eventos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosEvento)
        });

        if (!response.ok) {
            throw new Error('Erro ao gravar evento');
        } else {
            const evento = await response.json();
            return evento;
        }
    }

    async excluirEvento(id) {
        const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok) {
            throw new Error('Erro ao excluir evento');
        }
    }

    async atualizarEvento(dadosEvento, id) {
        const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosEvento)
        });
        if(!response.ok) {
            throw new Error('Erro ao atualizar evento')
        } else {
            const evento = await response.json();
            return evento;
        }
    }

    async obterEventoPorId(id) {
        const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter evento');
        } else {
            const evento = await response.json();
            return evento;
        }
    }

}

window.EventosServices = EventosServices;
