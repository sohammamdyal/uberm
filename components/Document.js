import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './../app/styles/Ddocu.module.css';
import './../styles/Document.css';
import Swal from 'sweetalert2';

const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [idProof, setIdProof] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/documents/get-documents');
        setDocuments(response.data.documents);
      } catch (error) {
        console.error('Error fetching documents', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleAddDocument = async (e) => {
    e.preventDefault();

    const documentData = { idProof, documentType, status };

    try {
      const response = await axios.post('http://localhost:5000/api/documents/add-document', documentData);

      if (response.status === 201) {
        alert('Document added successfully!');
        Swal.fire('Driver Document uploaded Successfully', 'Check Out In List', 'success');
        setShowForm(false);
        setIdProof('');
        setDocumentType('');
        setStatus('');

        const updatedResponse = await axios.get('http://localhost:5000/api/documents/get-documents');
        setDocuments(updatedResponse.data.documents);
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1 className="h1">Add Driver Document</h1>
      <button onClick={() => setShowForm(true)} className="addButton">Add Document</button>
      {showForm && (
        <div className="modal">
          <form className="form" onSubmit={handleAddDocument}>
            <h2>Add Document</h2>
            <div className="formGroup">
              <label className="label">ID Proof</label>
              <input
                className="input"
                type="text"
                value={idProof}
                onChange={(e) => setIdProof(e.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label className="label">Document Type</label>
              <input
                className="input"
                type="text"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label className="label">Status</label>
              <select
                className="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button type="submit" className="submitButton">Submit</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cancelButton"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>ID Proof</th>
              <th>Document Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.idProof}>
                <td>{document.idProof}</td>
                <td>{document.documentType}</td>
                <td>{document.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Document;
