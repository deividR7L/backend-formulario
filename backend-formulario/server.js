const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

const transporter = nodemailer.createTransport({
  host: "smtp.mail.me.com",
  port: 587,
  secure: false, // Falso se for porta 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nova mensagem: ${subject}`,
      text: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone}
        Mensagem: ${message}
      `,
    });

    res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao enviar mensagem." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
