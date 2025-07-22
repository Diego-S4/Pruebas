const productos = [
    { id: 1, nombre: "Torta de Chocolate", precio: 50, imagen: "img/torta_chocolate.jpg", descripcion: "Deliciosa torta de chocolate con relleno de fudge.", dimensiones: "20cm de diámetro" },
    { id: 2, nombre: "Torta de Vainilla", precio: 45, imagen: "img/torta_vainilla.jpg", descripcion: "Torta esponjosa de vainilla con crema pastelera.", dimensiones: "22cm de diámetro" },
    { id: 3, nombre: "Bocaditos de Coco", precio: 20, imagen: "img/bocaditos_coco.jpg", descripcion: "Bocaditos dulces de coco rallado.", dimensiones: "50g por unidad" },
    { id: 4, nombre: "Torta de Fresa", precio: 55, imagen: "img/torta_fresa.jpg", descripcion: "Torta con capas de fresa fresca.", dimensiones: "20cm de diámetro" },
    { id: 5, nombre: "Pastel de Tres Leches", precio: 48, imagen: "img/tres_leches.jpg", descripcion: "Pastel húmedo con tres leches.", dimensiones: "18cm de diámetro" },
    { id: 6, nombre: "Torta de Zanahoria", precio: 50, imagen: "img/torta_zanahoria.jpg", descripcion: "Torta de zanahoria con nueces.", dimensiones: "20cm de diámetro" },
    { id: 7, nombre: "Bocaditos de Chocolate", precio: 22, imagen: "img/bocaditos_choco.jpg", descripcion: "Bocaditos cubiertos de chocolate.", dimensiones: "40g por unidad" },
    { id: 8, nombre: "Torta de Lúcuma", precio: 52, imagen: "img/torta_lucuma.jpg", descripcion: "Torta con sabor a lúcuma peruana.", dimensiones: "22cm de diámetro" },
    { id: 9, nombre: "Pastel de Limón", precio: 47, imagen: "img/pastel_limon.jpg", descripcion: "Pastel refrescante de limón.", dimensiones: "18cm de diámetro" },
    { id: 10, nombre: "Torta Red Velvet", precio: 55, imagen: "img/red_velvet.jpg", descripcion: "Torta Red Velvet con queso crema.", dimensiones: "20cm de diámetro" },
    { id: 11, nombre: "Bocaditos de Manjar", precio: 18, imagen: "img/bocaditos_manjar.jpg", descripcion: "Bocaditos rellenos de manjar blanco.", dimensiones: "45g por unidad" },
    { id: 12, nombre: "Torta de Maracuyá", precio: 50, imagen: "img/torta_maracuya.jpg", descripcion: "Torta con crema de maracuyá.", dimensiones: "20cm de diámetro" },
    { id: 13, nombre: "Pastel de Coco", precio: 46, imagen: "img/pastel_coco.jpg", descripcion: "Pastel con sabor intenso a coco.", dimensiones: "18cm de diámetro" },
    { id: 14, nombre: "Torta de Almendras", precio: 53, imagen: "img/torta_almendras.jpg", descripcion: "Torta con crujientes almendras.", dimensiones: "22cm de diámetro" },
    { id: 15, nombre: "Bocaditos de Fruta", precio: 20, imagen: "img/bocaditos_fruta.jpg", descripcion: "Bocaditos con frutas secas.", dimensiones: "50g por unidad" }
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
        `;
        div.addEventListener('click', () => {
            window.location.href = `productos.html?id=${producto.id}`;
        });
        lista.appendChild(div);
    });
    actualizarContador();
}

function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    document.querySelectorAll('#carrito-contador').forEach(contador => {
        contador.textContent = carrito.length;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
});