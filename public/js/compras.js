function mostrarCarrito() {
    const lista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('carrito-total');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    lista.innerHTML = '';
    let total = 0;
    carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'mb-2 d-flex justify-content-between';
        div.innerHTML = `
            ${producto.nombre} - S/ ${producto.precio}
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        lista.appendChild(div);
        total += producto.precio;
    });
    totalElement.textContent = `Total: S/ ${total}`;
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function simularPago(metodo) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'Agrega productos antes de pagar'
        });
        return;
    }
    Swal.fire({
        icon: 'success',
        title: 'Pago exitoso',
        text: `Pago procesado con ${metodo}. ¡Gracias por tu compra!`,
        timer: 2000
    }).then(() => {
        localStorage.removeItem('carrito');
        mostrarCarrito();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    document.getElementById('pagar-btn').addEventListener('click', () => {
        document.getElementById('pago-opciones').style.display = 'block';
    });
});