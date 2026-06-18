require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const question = req.body.question;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is missing in .env' });
  }

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: question }],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Gemini API request failed',
        raw: data,
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});