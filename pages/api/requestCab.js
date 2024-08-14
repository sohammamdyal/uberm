// pages/api/requestCab.js

let pendingRequests = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const cabRequest = req.body;
    pendingRequests.push(cabRequest);
    res.status(200).json({ message: 'Cab request received' });
  } else if (req.method === 'GET') {
    res.status(200).json(pendingRequests);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    pendingRequests = pendingRequests.filter(request => request.id !== id);
    res.status(200).json({ message: 'Cab request deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
