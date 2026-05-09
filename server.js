const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    cb(null, allowed.includes(file.mimetype));
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST route for form submission
app.post('/candidatar', upload.single('foto'), async (req, res) => {
  const {
    nome, idade, whatsapp, instagram,
    qualidade, defeito, porquemerece, firstdate
  } = req.body;

  const attachments = [];
  if (req.file) {
    attachments.push({
      filename: req.file.originalname || 'foto-candidata.jpg',
      content: req.file.buffer,
      contentType: req.file.mimetype
    });
  }

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Georgia, serif; background: #fff9f5; color: #2a0a15; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 40px rgba(232,48,90,0.15); }
    .header { background: linear-gradient(135deg, #3d0c22, #b81f42, #e8305a); color: white; padding: 40px 32px; text-align: center; }
    .header h1 { font-size: 2rem; margin: 0 0 8px; }
    .header p  { opacity: 0.85; margin: 0; font-style: italic; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; background: #ffeef3; border-radius: 10px; padding: 16px 20px; border-left: 4px solid #e8305a; }
    .field-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #8c4a60; font-weight: bold; margin-bottom: 6px; }
    .field-value { font-size: 1rem; color: #2a0a15; line-height: 1.6; }
    .footer { background: #3d0c22; color: rgba(255,255,255,0.7); text-align: center; padding: 20px; font-size: 0.8rem; }
    .heart { color: #e8305a; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>💘 Nova Candidatura!</h1>
      <p>Departamento Oficial do Meu Coração</p>
    </div>
    <div class="body">
      <p style="text-align:center; font-size:1.1rem; margin-bottom:28px;">
        🎉 Alguém se candidatou para a vaga de <strong>Amor da Minha Vida</strong>!
      </p>

      <div class="field">
        <div class="field-label">Nome Completo</div>
        <div class="field-value">${nome || '—'}</div>
      </div>
      <div class="field">
        <div class="field-label">Idade</div>
        <div class="field-value">${idade || '—'} anos</div>
      </div>
      <div class="field">
        <div class="field-label">WhatsApp</div>
        <div class="field-value">${whatsapp || '—'}</div>
      </div>
      <div class="field">
        <div class="field-label">Instagram</div>
        <div class="field-value">${instagram ? '@' + instagram.replace('@','') : '—'}</div>
      </div>
      <div class="field">
        <div class="field-label">Qualidade mais bonita</div>
        <div class="field-value">${qualidade || '—'}</div>
      </div>
      <div class="field">
        <div class="field-label">Defeito mais aceitável</div>
        <div class="field-value">${defeito || '—'}</div>
      </div>
      <div class="field">
        <div class="field-label">Por que merece a vaga?</div>
        <div class="field-value">${(porquemerece || '—').replace(/\n/g, '<br>')}</div>
      </div>
      <div class="field">
        <div class="field-label">Primeiro date ideal</div>
        <div class="field-value">${(firstdate || '—').replace(/\n/g, '<br>')}</div>
      </div>

      ${req.file ? '<p style="text-align:center; color:#e8305a; font-size:0.9rem; margin-top:16px;">📷 Foto anexada — veja abaixo!</p>' : '<p style="text-align:center; color:#8c4a60; font-size:0.9rem; margin-top:16px;">Sem foto enviada.</p>'}
    </div>
    <div class="footer">
      💌 Departamento Oficial do Meu Coração · Todos os sentimentos reservados
    </div>
  </div>
</body>
</html>
  `.trim();

  const mailOptions = {
    from: `"💘 Coração Recrutador" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_DESTINO || process.env.EMAIL_USER,
    subject: `💌 Nova candidatura: ${nome || 'Candidata Misteriosa'} quer a vaga de Amor da Minha Vida!`,
    html: htmlBody,
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email enviado para ${mailOptions.to} — candidata: ${nome}`);
    res.json({ success: true, message: 'Candidatura recebida com amor! 💕' });
  } catch (err) {
    console.error('❌ Erro ao enviar email:', err.message);
    // Still return success to user (don't break their experience)
    res.json({ success: false, message: 'Candidatura recebida, mas houve um erro no email.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', message: '💓 Coração funcionando!' }));

app.listen(PORT, () => {
  console.log(`\n💘 Departamento Oficial do Meu Coração`);
  console.log(`🌹 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📧 Emails serão enviados para: ${process.env.EMAIL_DESTINO || process.env.EMAIL_USER || 'Configure o .env!'}\n`);
});
