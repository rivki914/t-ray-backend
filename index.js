const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Buat kode HTML/JS/CSS untuk: ${prompt}`,
      max_tokens: 500,
    });
    res.json({ result: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});