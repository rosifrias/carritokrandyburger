let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    renderCart();
}

function removeFromCart(index) {
    total -= cart[index].price; // Restar el precio del producto eliminado del total
    cart.splice(index, 1); // Eliminar el producto del carrito
    renderCart();
}

function renderCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';
    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        const span = document.createElement('span');
        span.textContent = `${product.item} - $${product.price}`;
        span.classList.add('product-details');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.classList.add('button-remove');
        removeButton.onclick = () => {
            removeFromCart(index);
        };

        li.appendChild(span);
        li.appendChild(removeButton);
        cartElement.appendChild(li);
    });
    document.getElementById('total').textContent = total;
}

document.getElementById('sendOrder').addEventListener('click', () => {
    const phoneNumber = '56954381023'; // Reemplaza con tu número de WhatsApp, incluyendo el código de país
    let orderText = 'Hola, quiero hacer el siguiente pedido:\n';
    cart.forEach(product => {
        orderText += `${product.item} - $${product.price}\n`;
    });
    orderText += `Total: $${total}`;
    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
});
