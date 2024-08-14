// server/routes/documents.js
const express = require('express');
const Document = require('./../document');

const router = express.Router();

// Create a document
router.post('/add-document', async (req, res) => {
  const { idProof, documentType, status } = req.body;
  const newDocument = new Document({ idProof, documentType, status });
  try {
    await newDocument.save();
    res.status(201).json({ message: 'Document created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving document' });
  }
});

// Get all documents
router.get('/get-documents', async (req, res) => {
  try {
    const documents = await Document.find({});
    res.status(200).json({ documents });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

module.exports = router;
