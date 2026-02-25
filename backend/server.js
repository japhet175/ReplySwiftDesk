require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Resend } = require('resend');
const validator = require('validator');

const app = express();

// ===== CORS =====
app.use(cors({
  origin: [
    "https://replyswiftdesk.site",
    "https://api.replyswiftdesk.site",
    "http://localhost:5000",
    "http://localhost:5500",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:8001"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

// ===== MongoDB Atlas =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// ===== Resend Initialization =====
const resend = new Resend(process.env.RESEND_API_KEY);

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
  try {
    const { email } = req.query;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).send('<h2>❌ Invalid link</h2>');
    }

    const normalizedEmail = validator.normalizeEmail(email);
    const client = await Client.findOneAndUpdate(
      { email: normalizedEmail },
      { subscribed: false },
      { new: true }
    );

    if (!client) return res.status(404).send('<h2>❌ Email not found</h2>');

    res.send(`
      <h2>✅ Unsubscription Successful</h2>
      <p>${validator.escape(normalizedEmail)} has been removed from our mailing list.</p>
    `);
  } catch (err) {
    console.error('❌ Unsubscribe error:', err);
    res.status(500).send('<h2>Error while unsubscribing</h2>');
  }
});

// ===== POST /send-email =====
app.post('/send-email', async (req, res) => {
  try {
    let { email, message } = req.body;

    // Validation
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message required' });
    }

    const normalizedEmail = validator.normalizeEmail(email);

    // Vérifie si l'utilisateur est inscrit ou non
    let client = await Client.findOneAndUpdate(
      { email: normalizedEmail },
      { $setOnInsert: { subscribed: true } },
      { new: true, upsert: true }
    );

    if (!client.subscribed) {
      return res.status(403).json({ success: false, error: 'User unsubscribed' });
    }

    // URL unsubscribe
    const unsubscribeUrl = `${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(normalizedEmail)}`;

    // ✅ Construire le HTML correctement (évite le rendu en texte brut)
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
        <div style="padding:20px;">
          ${message}  <!-- ici ton message HTML -->
        </div>
        <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />
        <div style="text-align:center; font-size:10px; color:#999;">
          <a href="${unsubscribeUrl}" 
             style="color:#999; text-decoration:none;">
             Unsubscribe
          </a>
        </div>
        <div style="text-align:center; font-size:12px; color:#666; margin-top:10px;">
          SwiftReply Team<br>
          ReplySwiftDesk.site | +250 798 980 113
        </div>
      </div>
    `;

    // ===== Envoi via Resend =====
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [normalizedEmail],
      subject: "Latest News from ReplySwiftDesk",
      html: htmlContent,      // ✅ HTML pour rendu correct
      text: `${message}\n\nTo unsubscribe: ${unsubscribeUrl}` // fallback texte
    });

    console.log(`✅ Email sent via Resend: ${response.data?.id || 'no id'}`);

    res.json({ success: true, message: '✅ Email sent successfully' });
  } catch (err) {
    console.error('❌ Email send error:', err);
    res.status(500).json({ success: false, error: err.message || 'Error while sending email' });
  }
});

// ===== Root Route =====
app.get('/', (req, res) => {
  res.json({ success: true, message: '✅ ReplySwiftDesk backend is running. Use /send-email or /unsubscribe' });
});

// ===== Server Start =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));