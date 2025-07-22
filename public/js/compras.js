const velas = [
    { id: 1, nombre: "Vela Clásica Roja", imagen: "img/vela_roja.jpg" },
    { id: 2, nombre: "Vela Estrella", imagen: "img/vela_estrella.jpg" },
    { id: 3, nombre: "Vela Número 1", imagen: "img/vela_numero1.jpg" },
    { id: 4, nombre: "Vela Corazón", imagen: "img/vela_corazon.jpg" },
    { id: 5, nombre: "Vela Espiral", imagen: "img/vela_espiral.jpg" },
    { id: 6, nombre: "Vela Azul Brillante", imagen: "img/vela_azul.jpg" },
    { id: 7, nombre: "Vela Dorada", imagen: "img/vela_dorada.jpg" },
    { id: 8, nombre: "Vela Floral", imagen: "img/vela_floral.jpg" },
    { id: 9, nombre: "Vela Arcoíris", imagen: "img/vela_arcoiris.jpg" },
    { id: 10, nombre: "Vela Estrellas", imagen: "img/vela_estrellas.jpg" }
];

function mostrarCarrito() {
    const lista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('carrito-total');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    lista.innerHTML = '';
    let total = 0;
    carrito.forEach((producto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td>S/ ${producto.precio}</td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
        `;
        lista.appendChild(tr);
        total += producto.precio;
    });
    totalElement.textContent = `Total: S/ ${total}`;
    actualizarContador();
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito[index];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: `${producto.nombre} ha sido eliminado del carrito`,
        timer: 1500
    });
}

function mostrarVelas() {
    const lista = document.getElementById('velas-lista');
    lista.innerHTML = '';
    velas.forEach(vela => {
        const div = document.createElement('div');
        div.className = 'col-md-3 vela-card';
        div.innerHTML = `
            <img src="${vela.imagen}" alt="${vela.nombre}">
            <p>${vela.nombre}</p>
        `;
        div.addEventListener('click', () => {
            document.querySelectorAll('.vela-card').forEach(card => card.classList.remove('selected'));
            div.classList.add('selected');
        });
        lista.appendChild(div);
    });
}

async function simularPago(metodo) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'Agrega productos antes de pagar'
        });
        return;
    }
    const nombreTorta = document.getElementById('nombre-torta').value || 'No especificado';
    const velaSeleccionada = document.querySelector('.vela-card.selected')?.querySelector('p').textContent || 'Ninguna';
    const mensaje = `
        Nuevo pedido:
        Productos:
        ${carrito.map(p => `- ${p.nombre} (S/ ${p.precio})`).join('\n')}
        Total: S/ ${carrito.reduce((sum, p) => sum + p.precio, 0)}
        Nombre de la torta: ${nombreTorta}
        Vela: ${velaSeleccionada}
        Método de pago: ${metodo}
    `;
    try {
        const response = await fetch('/enviar-pedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensaje })
        });
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Gracias por su compra',
                text: 'Puede pasar a recogerlo.',
                timer: 2000
            }).then(() => {
                localStorage.removeItem('carrito');
                document.getElementById('detalles-compra').style.display = 'none';
                document.getElementById('pago-opciones').style.display = 'none';
                mostrarCarrito();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo enviar el pedido. Intente de nuevo.'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo conectar con el servidor. Intente de nuevo.'
        });
    }
}

function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    document.querySelectorAll('#carrito-contador').forEach(contador => {
        contador.textContent = carrito.length;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    document.getElementById('continuar-btn').addEventListener('click', () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Carrito vacío',
                text: 'Agrega productos antes de continuar'
            });
            return;
        }
        Swal.fire({
            icon: 'info',
            title: 'Información de entrega',
            text: 'La entrega de la torta está a 24 horas para poder recogerla.',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('detalles-compra').style.display = 'block';
                mostrarVelas();
            }
        });
    });
    document.getElementById('pagar-btn').addEventListener('click', () => {
        document.getElementById('pago-opciones').style.display = 'block';
    });
});