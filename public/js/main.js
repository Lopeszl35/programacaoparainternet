const ticketPrice = parseFloat(document.getElementById('ticketForm').dataset.price);
let ticketsAvailable = parseInt(document.getElementById('ticketForm').dataset.ticketsavailable);

document.getElementById('quantity').addEventListener('input', function() {
    const quantity = parseInt(this.value);
    if (quantity > ticketsAvailable) {
        this.value = ticketsAvailable;
        alert('Quantidade indisponível');
    }
    const totalPrice = ticketPrice * quantity;
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
});

document.getElementById('comprarbotao').addEventListener('click', function(event) {
    event.preventDefault(); 
    const quantity = parseInt(document.getElementById('quantity').value);

    if (quantity <= ticketsAvailable) {
        ticketsAvailable -= quantity;
        document.getElementById('ticketForm').dataset.ticketsavailable = ticketsAvailable;

        
        document.getElementById('ingressosDisponiveis').innerText = `Ingressos Disponíveis: ${ticketsAvailable}`;

        alert('Compra realizada com sucesso!');
    } else {
        alert('Não há ingressos suficientes disponíveis.');
    }
});
