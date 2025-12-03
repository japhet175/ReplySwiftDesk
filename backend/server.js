require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});
const Client = mongoose.model('Client', clientSchema);

app.get('/api/clients', async (req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 }).limit(100);
  res.json(clients);
});

app.post('/api/clients', async (req, res) => {
  try {
    const c = new Client(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
