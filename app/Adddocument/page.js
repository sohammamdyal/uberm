"use client";
import React, { useState } from "react";
import styles from "./../styles/Ddocu.module.css";

const AddDocument = () => {
  const [idProof, setIdProof] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const documentData = { idProof, documentType, status };

    try {
      const response = await fetch('http://localhost:5000/add-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      if (response.ok) {
        alert('Document added successfully!');
        setIdProof("");
        setDocumentType("");
        setStatus("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Add Document</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>ID Proof</label>
          <input
            className={styles.input}
            type="text"
            value={idProof}
            onChange={(e) => setIdProof(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Document Type</label>
          <input
            className={styles.input}
            type="text"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select
            className={styles.select}
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
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default AddDocument;