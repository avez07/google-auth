const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = 5000;
const CLIENT_ID = '847530120400-vs691i7pctacu1ave86fvh8vofg2jeiq.apps.googleusercontent.com'; // Replace with your actual client ID

const client = new OAuth2Client(CLIENT_ID);

app.use(cors({
    origin: ['http://localhost:3000', 'https://73cc-219-91-139-228.ngrok-free.app'], // Add ngrok URL if using it
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
app.use(express.json());
app.post('/',async (req,res)=>{
    res.send('response from backend')
})

app.post('/api/google-login', async (req, res) => {
//    res.send(req.body)
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;
    // You can create your own JWT here if needed
    res.status(200).json({ name, email, picture });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
