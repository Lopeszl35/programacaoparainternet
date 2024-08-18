const ticketPrice = parseFloat(document.getElementById('ticketForm').dataset.price);

document.getElementById('quantity').addEventListener('input', function() {
    const quantity = parseInt(this.value);
    const totalPrice = ticketPrice * quantity;
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
});

document.getElementById('comprarbotao').addEventListener('click', function() {
    alert('Compra realizada com sucesso!');
})