# 💘 Amor da Minha Vida — Site Romântico de Candidatura

> *"Estamos contratando para a vaga mais importante do universo."*

Site romântico e divertido que simula uma página de vaga de emprego, mas é na verdade uma cantada criativa para a pessoa do seu coração. 💕

---

## 📁 Estrutura do Projeto

```
amor-da-minha-vida/
├── public/
│   ├── index.html      ← Página principal (visual completo)
│   ├── style.css       ← Estilos elegantes e responsivos
│   └── app.js          ← Animações, corações, formulário
├── server.js           ← Backend Node.js + Express
├── package.json        ← Dependências
├── .env.example        ← Modelo do arquivo de configuração
├── .gitignore
└── README.md
```

---

## 🚀 Como Instalar e Rodar

### 1. Instale o Node.js
Baixe em: https://nodejs.org (versão LTS recomendada)

### 2. Instale as dependências
```bash
cd amor-da-minha-vida
npm install
```

### 3. Configure o arquivo `.env`
```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

Abra o `.env` e preencha:
```env
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_aqui
EMAIL_DESTINO=email_que_recebe@gmail.com
PORT=3000
```

### 4. Inicie o servidor
```bash
npm start
```

### 5. Acesse no navegador
```
http://localhost:3000
```

---

## 📧 Configurando o Email (Gmail)

> ⚠️ **Não use sua senha normal do Gmail!** Você precisa criar uma **Senha de App**.

### Passo a passo:

1. Acesse: https://myaccount.google.com/security
2. Ative a **Verificação em duas etapas** (se ainda não tiver)
3. Vá em **"Senhas de app"** (pesquise no campo de busca do Google Account)
4. Clique em **"Criar senha de app"**
5. Escolha "Outro (nome personalizado)" → escreva `amor-da-minha-vida`
6. Clique em **Criar**
7. Copie a senha gerada (16 caracteres, ex: `abcd efgh ijkl mnop`)
8. Cole **sem espaços** no `.env`:
   ```
   EMAIL_PASS=abcdefghijklmnop
   ```

---

## 🌐 Como Hospedar Online (Grátis!)

### Opção 1: Railway.app (Mais fácil)
1. Acesse https://railway.app e faça login com GitHub
2. Clique em **New Project → Deploy from GitHub repo**
3. Selecione seu repositório
4. Vá em **Variables** e adicione as variáveis do `.env`
5. Pronto! Você ganha uma URL pública

### Opção 2: Render.com
1. Acesse https://render.com
2. **New → Web Service**
3. Conecte o repositório GitHub
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Adicione as variáveis de ambiente em **Environment**
7. Deploy!

### Opção 3: Heroku
```bash
heroku create meu-amor-da-minha-vida
heroku config:set EMAIL_USER=... EMAIL_PASS=... EMAIL_DESTINO=...
git push heroku main
```

---

## ✨ Funcionalidades

| Recurso | Status |
|--------|--------|
| Design romântico e elegante | ✅ |
| Corações flutuando na tela | ✅ |
| Frases românticas aleatórias | ✅ |
| Contador de candidatos | ✅ |
| Formulário com upload de foto | ✅ |
| Animação de análise de compatibilidade | ✅ |
| Porcentagem de compatibilidade | ✅ |
| Confetti na aprovação | ✅ |
| Mensagem final com aprovação | ✅ |
| Efeitos sonoros opcionais | ✅ |
| Depoimentos fictícios | ✅ |
| Responsivo (mobile + desktop) | ✅ |
| Envio de email com Nodemailer | ✅ |
| Email HTML estilizado | ✅ |
| Foto anexada no email | ✅ |

---

## 💡 Dicas de Uso

- Envie o link para a pessoa que quer conquistar
- Pode personalizar o texto em `index.html` com detalhes pessoais
- Mude a cor principal em `style.css` na variável `--rose`
- Adicione sua cidade em "📍 No meu coração" no header

---

## 🛠️ Tecnologias

- **HTML5** — estrutura semântica
- **CSS3** — animações, gradientes, grid, flexbox
- **JavaScript (Vanilla)** — interatividade e animações
- **Node.js + Express** — servidor backend
- **Nodemailer** — envio de emails
- **Multer** — upload de fotos
- **dotenv** — variáveis de ambiente seguras

---

## ❤️ Feito com amor

*Que essa vaga seja preenchida pelo candidato perfeito!* 🌹

---

*Departamento Oficial do Meu Coração · Todos os sentimentos reservados 💘*
