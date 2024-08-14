// server/models/Document.js
const mongoose =require('mongoose');

const DocumentSchema = new mongoose.Schema({
  idProof: { type: String, required: true },
  documentType: { type: String, required: true },
  status: { type: String, required: true },
});

const Document = mongoose.models.Document || mongoose.model('DocumentInfo', DocumentSchema);

module.exports = Document;