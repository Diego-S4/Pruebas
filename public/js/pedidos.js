document.addEventListener('DOMContentLoaded', () => {
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Reemplaza con tu User ID de EmailJS
    document.getElementById('pedido-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const descripcion = document.getElementById('descripcion').value;
        const foto = document.getElementById('foto').files[0];

        let fotoBase64 = '';
        if (foto) {
            fotoBase64 = await toBase64(foto);
        }

        const mensaje = `
            Nuevo pedido personalizado:
            Nombre: ${nombre} ${apellidos}
            Correo: ${correo}
            Teléfono: ${telefono}
            Descripción: ${descripcion}
            Foto: ${foto ? 'Adjuntada' : 'No adjuntada'}
        `;

        // Generar QR
        const qr = new QRCode(document.getElementById('qrcode'), {
            text: `https://wa.me/51987654321?text=${encodeURIComponent(mensaje)}`,
            width: 128,
            height: 128
        });

        // Enviar por EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            mensaje: mensaje,
            foto: fotoBase64,
            from_name: `${nombre} ${apellidos}`,
            reply_to: correo
        }).then(() => {
            document.getElementById('mensaje-exito').style.display = 'block';
            document.getElementById('pedido-form').reset();
            // Abrir WhatsApp
            window.open(`https://wa.me/51987654321?text=${encodeURIComponent(mensaje)}`, '_blank');
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al enviar el pedido: ' + error.message
            });
        });
    });
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}