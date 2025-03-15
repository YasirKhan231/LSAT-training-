import { db } from "@/lib/firebaseAdmin";// Import your existing Firebase config

export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    const { email } = req.query;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Fetch the study plan from Firestore
      const doc = await db.collection('users').doc(email).get();

      if (!doc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return the study plan to the frontend
      const userData = doc.data();
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching plan:', error);
      res.status(500).json({ error: 'Failed to fetch study plan' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}