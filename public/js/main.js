const ticketPrice = parseFloat(document.getElementById('ticketForm').dataset.price);
let ticketsavailable = parseInt(document.getElementById('ticketForm').dataset.ticketsavailable);

document.getElementById('quantity').addEventListener('input', function() {
    const quantity = parseInt(this.value);
    if (quantity > ticketsavailable) {
        this.value = ticketsavailable;
        alert('Quantidade indisponível');
    }
    const totalPrice = ticketPrice * quantity;
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
});

document.getElementById('comprarbotao').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do botão de envio do formulário
    const quantity = parseInt(document.getElementById('quantity').value);

    if (quantity <= ticketsavailable) {
        ticketsavailable -= quantity;
        document.getElementById('ticketForm').dataset.ticketsavailable = ticketsavailable;

        // Atualiza a exibição dos ingressos disponíveis no DOM
        document.querySelector('p:contains("Ingressos Disponíveis")').innerText = `Ingressos Disponíveis: ${ticketsavailable}`;

        alert('Compra realizada com sucesso!');
    } else {
        alert('Não há ingressos suficientes disponíveis.');
    }
});
