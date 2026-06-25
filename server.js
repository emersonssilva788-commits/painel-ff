const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

// Simulando banco de dados com chaves
const db = {
    "CHAVE_VIP_01": { status: "active", hwid: null },
    "CHAVE_VIP_02": { status: "active", hwid: null }
};

// Rota de Login/Autenticação para o Menu do Jogo
app.post('/api/auth', (req, res) => {
    const { key, hwid } = req.body;
    
    if (!db[key]) return res.json({ success: false, message: "Chave inexistente" });
    
    if (db[key].status !== "active") return res.json({ success: false, message: "Chave expirada" });

    // Se a chave não tem HWID, vincula o primeiro que logar
    if (!db[key].hwid) {
        db[key].hwid = hwid;
        return res.json({ success: true, message: "Chave vinculada com sucesso!" });
    }

    // Verifica se o HWID é o mesmo
    if (db[key].hwid === hwid) {
        res.json({ success: true, message: "Acesso Liberado" });
    } else {
        res.json({ success: false, message: "Chave já vinculada a outro aparelho" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor de Autenticação Ativo na porta ' + PORT));
