const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

let usuariosCadastrados = []; 

// --- Endpoint de Cadastro ---
app.post('/api/register', (req, res) => {
    console.log('Backend: Requisição /api/register recebida. Corpo:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Backend: Erro - Email ou senha faltando.');
        return res.status(400).json({ sucesso: false, mensagem: 'Email e senha são obrigatórios.' });
    }

    const usuarioExistente = usuariosCadastrados.find(user => user.email === email);
    if (usuarioExistente) {
        console.log('Backend: Erro - Email já cadastrado:', email);
        return res.status(409).json({ sucesso: false, mensagem: 'Este email já está cadastrado.' });
    }


    const novoUsuario = { 
        id: Date.now().toString(), 
        email: email, 
        senha: password 
    };
    usuariosCadastrados.push(novoUsuario);

    console.log('Backend: Usuário cadastrado:', novoUsuario);


    res.status(201).json({ 
        sucesso: true, 
        mensagem: 'Usuário cadastrado com sucesso!', 
        usuario: { id: novoUsuario.id, email: novoUsuario.email } 
    });
});

// --- Endpoint de Login ---
app.post('/api/login', (req, res) => {
    console.log('Backend: Requisição /api/login recebida. Corpo:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Backend: Erro - Email ou senha faltando para login.');
        return res.status(400).json({ sucesso: false, mensagem: 'Email e senha são obrigatórios para o login.' });
    }

    const usuarioEncontrado = usuariosCadastrados.find(user => user.email === email);
    
    if (!usuarioEncontrado) {
        console.log('Backend: Erro - Email não encontrado:', email);
        return res.status(401).json({ sucesso: false, mensagem: 'Email não encontrado.' });
    }

    if (usuarioEncontrado.senha !== password) { 
        console.log('Backend: Erro - Senha incorreta para o email:', email);
        return res.status(401).json({ sucesso: false, mensagem: 'Senha incorreta.' });
    }

    console.log('Backend: Login bem-sucedido para:', usuarioEncontrado.email);
    
    res.status(200).json({ 
        sucesso: true, 
        mensagem: 'Login bem-sucedido!',
        usuario: { id: usuarioEncontrado.id, email: usuarioEncontrado.email } 

    });
});


app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
    console.log('Endpoints disponíveis:');
    console.log(`  POST http://localhost:${PORT}/api/register`);
    console.log(`  POST http://localhost:${PORT}/api/login`);
    console.log('------------------------------------------------');
    console.log('Para testar o frontend, abra o arquivo FrontEnd/index.html (preferencialmente com Live Server)');
});