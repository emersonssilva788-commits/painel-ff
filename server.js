const express = require('express');
const app = express();
app.use(express.json());

// Banco de dados temporário (Chaves de acesso)
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

app.listen(3000, () => console.log('Servidor de Autenticação Online na porta 3000'));
