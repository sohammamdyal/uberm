import Document from '../document';
const { sendEventToAll } = require('./../server');
export const createDocument = async (req, res) => {
  try {
    const { idProof, documentType, status } = req.body;
    const document = new Document({ idProof, documentType, status });
    await document.save();
    sendEventToAll({ type: 'documentAdded', document: document });
    res.status(201).json({ message: 'Document created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating document' });
  }
};