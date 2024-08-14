import nextConnect from 'next-connect';
import mongoose from 'mongoose';

const app = nextConnect();

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new mongoose.model('User')({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Sign up successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

export default app;