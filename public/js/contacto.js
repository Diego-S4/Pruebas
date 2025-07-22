document.addEventListener('DOMContentLoaded', () => {
    new QRCode(document.getElementById('qrcode-contacto'), {
        text: 'https://wa.me/51987654321',
        width: 128,
        height: 128
    });
});