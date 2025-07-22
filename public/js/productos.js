const productos = [
    { id: 1, nombre: "Torta de Chocolate", precio: 50, imagen: "img/torta_chocolate.jpg" },
    { id: 2, nombre: "Torta de Vainilla", precio: 45, imagen: "img/torta_vainilla.jpg" },
    { id: 3, nombre: "Bocaditos de Coco", precio: 20, imagen: "img/bocaditos_coco.jpg" }
];

function mostrarProductos() {
    const lista = document.getElementById('productos-lista');
    lista.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'col-md-4 producto-card';
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>S/ ${producto.precio}</p>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        lista.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${producto.nombre} ha sido añadido al carrito`,
        timer: 1500
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
});