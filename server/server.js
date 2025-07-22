const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.static('../public')); // Servir archivos estáticos desde la carpeta public

app.post('/enviar-pedido', async (req, res) => {
    const { mensaje } = req.body;
    try {
        await client.messages.create({
            body: mensaje,
            from: 'whatsapp:+14155238886', // Número de Twilio para WhatsApp
            to: `whatsapp:${process.env.WHATSAPP_NUMERO}` // Número del negocio
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error enviando mensaje:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});