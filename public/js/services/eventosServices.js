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
}

window.EventosServices = EventosServices;
