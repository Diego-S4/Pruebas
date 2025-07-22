document.addEventListener('DOMContentLoaded', () => {
    new QRCode(document.getElementById('qrcode-contacto'), {
        text: 'https://wa.me/51955696928',
        width: 128,
        height: 128
    });
});