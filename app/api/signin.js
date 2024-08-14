import nextConnect from 'next-connect';
import mongoose from 'mongoose';

const app = nextConnect();

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await mongoose.model('User').findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // handle signin success
  } catch (error) {
    // handle signin error
  }
});

export default app;