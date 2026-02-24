require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Resend } = require('resend');
const validator = require('validator');

const app = express();

// ===== CORS COMPLET =====
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
  credentials: true,
  optionsSuccessStatus: 200
}));

// Gérer les requêtes OPTIONS (preflight) explicitement
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
    const { email, message } = req.body;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message required' });
    }

    const normalizedEmail = validator.normalizeEmail(email);

    let client = await Client.findOneAndUpdate(
      { email: normalizedEmail },
      { $setOnInsert: { subscribed: true } },
      { new: true, upsert: true }
    );

    if (!client.subscribed) {
      return res.status(403).json({ success: false, error: 'User unsubscribed' });
    }

    const unsubscribeUrl = `${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(normalizedEmail)}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p>${validator.escape(message)}</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="text-align: center;">
          <a href="${unsubscribeUrl}" 
             style="display:inline-block;padding:10px 20px;background-color:#1a73e8;color:white;text-decoration:none;border-radius:5px;">
            Unsubscribe
          </a>
        </p>
        <p style="color: #666; font-size: 12px; text-align: center;">
          If you no longer wish to receive our emails, click the link above.
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [normalizedEmail],
      subject: "Latest News from ReplySwiftDesk",
      html: htmlContent,
      text: `${message}\n\nTo unsubscribe: ${unsubscribeUrl}`
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.log(`✅ Email sent via Resend: ${data?.id}`);
    
    // Ajouter des en-têtes CORS explicites pour cette route
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.json({ success: true, message: '✅ Email sent successfully' });

  } catch (err) {
    console.error('❌ Email send error:', err);
    res.status(500).json({ success: false, error: err.message || 'Error while sending email' });
  }
});

// ===== Route de test CORS =====
app.get('/test-cors', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.json({ 
    success: true, 
    message: 'CORS is configured correctly!',
    origin: req.headers.origin || 'No origin'
  });
});

// ===== Root Route =====
app.get('/', (req, res) => {
  res.json({ success: true, message: '✅ ReplySwiftDesk backend is running. Use /send-email or /unsubscribe' });
});

// ===== Server Start =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));