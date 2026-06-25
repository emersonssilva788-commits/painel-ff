const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
// Isso serve os arquivos da pasta public automaticamente
app.use(express.static('public'));

const db = {
    "KEY123": { status: "active", hwid: "DEVICE_01" },
    "KEY456": { status: "active", hwid: "DEVICE_02" }
};

app.post('/login', (req, res) => {
    const { key, hwid } = req.body;
    if (db[key] && db[key].status === "active" && db[key].hwid === hwid) {
        res.json({ success: true, message: "Acesso Liberado" });
    } else {
        res.json({ success: false, message: "Chave inválida ou dispositivo não autorizado" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
