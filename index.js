
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();
// console.log(process.env.GEMINI_KEY_ID);
const corsOptions = {
  origin: 'https://chat-ai-application-frontend.vercel.app', // Your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());

const PORT =5000;

app.get('/', (req, res) => {
  res.send("Hello I am active");
})
// app.use('/',(req,res)=>{
//   console.log("Hello bhaiya");
// })

app.post('/api/generate', async (req, res) => {
  // return res.json("Hello bro");
  console.log("hello" + process.env.VITE_GEMINI_KEY_ID);
  try {
    console.log(req.body);
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_KEY_ID}`,
      req.body
    );
    console.log(response.data.candidates[0].content.parts[0].text);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the answer' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));