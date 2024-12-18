# Nova-TIC - Sistema de Agendamento de Consultas

Sistema de agendamento de consultas com notificações em tempo real.

## Configuração para Deploy

1. **Criar uma conta no GitHub**
   - Acesse [GitHub](https://github.com) e crie uma conta se ainda não tiver

2. **Criar um novo repositório no GitHub**
   - Clique em "New repository"
   - Dê um nome ao repositório (ex: nova-tic)
   - Deixe público
   - Clique em "Create repository"

3. **Preparar o projeto para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/nova-tic.git
   git push -u origin main
   ```

4. **Configurar MongoDB Atlas**
   - Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crie um novo cluster (pode usar o tier gratuito)
   - Em "Network Access", adicione `0.0.0.0/0` para permitir acesso de qualquer lugar
   - Em "Database Access", crie um usuário com permissão de leitura/escrita
   - Obtenha a string de conexão e substitua no arquivo `.env`

5. **Deploy no Render**
   - Crie uma conta no [Render](https://render.com)
   - Clique em "New +" e selecione "Web Service"
   - Conecte com sua conta do GitHub
   - Selecione o repositório do Nova-TIC
   - Configure:
     - Name: nova-tic (ou outro nome de sua escolha)
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `node server.js`
   - Em "Environment Variables", adicione:
     - `MONGODB_URI`: sua string de conexão do MongoDB Atlas
     - `PORT`: 5000
     - `FRONTEND_URL`: URL do seu frontend (se tiver)
   - Clique em "Create Web Service"

6. **Atualizar URLs no Frontend**
   - Após o deploy, atualize todas as URLs de API no frontend para apontar para sua nova URL do Render
   - Atualize a URL do Socket.IO no arquivo notifications.html

## Desenvolvimento Local

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente no arquivo `.env`

3. Inicie o servidor:
   ```bash
   npm start
   ```

4. Acesse `http://localhost:5000` no navegador

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Socket.IO
- HTML/CSS/JavaScript
