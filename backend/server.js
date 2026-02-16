require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const validator = require('validator');

const app = express();

// ===== CORS =====
app.use(cors({
  origin: [
    "https://swiftreplydesk.site",
    "https://api.swiftreplydesk.site",
    "http://localhost:5000",
    "http://localhost:5500"
  ],
  methods: ["GET", "POST"]
}));
app.use(express.json());

// ===== MongoDB Atlas =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// ===== Client Model =====
const ClientSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address'] 
  },
  subscribed: { type: Boolean, default: true },
});
ClientSchema.index({ email: 1 }, { unique: true });
const Client = mongoose.model('Client', ClientSchema);

// ===== GET /unsubscribe =====
app.get('/unsubscribe', async (req, res) => {
  const { email } = req.query;
  if (!email || !validator.isEmail(email)) return res.status(400).send('<h2>❌ Invalid link</h2>');

  try {
    const client = await Client.findOneAndUpdate(
      { email },
      { subscribed: false },
      { new: true }
    );
    if (!client) return res.status(404).send('<h2>❌ Email not found</h2>');

    res.send(`
      <h2>✅ Unsubscription Successful</h2>
      <p>${validator.escape(email)} has been removed from our mailing list.</p>
    `);
  } catch (err) {
    console.error('❌ Unsubscribe error:', err);
    res.status(500).send('<h2>Error while unsubscribing</h2>');
  }
});

// ===== POST /send-email =====
app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !validator.isEmail(email))
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  if (!message || message.trim().length === 0)
    return res.status(400).json({ success: false, error: 'Message required' });

  try {
    let client = await Client.findOne({ email });
    if (client && !client.subscribed)
      return res.status(403).json({ success: false, error: 'User unsubscribed' });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: parseInt(process.env.SMTP_PORT, 10) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
      // ⚠ Remove tls: { rejectUnauthorized: false } in production
    });

    const unsubscribeUrl = `${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
    const htmlContent = `
      <p>${validator.escape(message)}</p>
      <a href="${unsubscribeUrl}" 
         style="display:inline-block;padding:10px 20px;background-color:#1a73e8;color:white;text-decoration:none;border-radius:5px;">
        Unsubscribe
      </a>
    `;

    await transporter.sendMail({
      from: `"ReplySwiftDesk" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Latest News from ReplySwiftDesk",
      html: htmlContent,
    });

    if (!client) client = await Client.create({ email, subscribed: true });

    res.json({ success: true, message: '✅ Email sent successfully' });
  } catch (err) {
    console.error('❌ Email send error:', err);
    res.status(500).json({ success: false, error: 'Error while sending email' });
  }
});

// ===== Root Route =====
app.get('/', (req, res) => {
  res.json({ success: true, message: '✅ ReplySwiftDesk backend is running. Use /send-email or /unsubscribe' });
});

// ===== Server Start =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
