import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { feedback } = req.body;

    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('feedbacks');
      await collection.insertOne({ feedback, createdAt: new Date() });

      res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting feedback', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
