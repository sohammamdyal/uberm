import React, { useEffect, useState } from 'react';
import styles from './../app/styles/AdminDashboard.module.css'; // Assuming you saved the new CSS module as AdminDashboard.module.css

const AdminDashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/form/contact", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setContacts(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error);
                }
            } catch (error) {
                setError('An error occurred while fetching data. Please try again.');
                console.log(error);
            }
        };

        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/form/contact/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setContacts(contacts.filter(contact => contact._id !== id));
                alert('Contact deleted successfully');
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            setError('An error occurred while deleting data. Please try again.');
            console.log(error);
        }
    };

    return (
        <div className={styles.adminDashboard}>
            <h1 className={styles.h1}>Manage User Contacts</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Username</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Message</th>
                            <th className={styles.th}>Date</th>
                            <th className={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact._id} className={styles.tr}>
                                <td className={styles.td}>{contact.username}</td>
                                <td className={styles.td}>{contact.email}</td>
                                <td className={styles.td}>{contact.message}</td>
                                <td className={styles.td}>{new Date(contact.createdAt).toLocaleString()}</td>
                                <td className={styles.td}>
                                    <button 
                                        onClick={() => handleDelete(contact._id)} 
                                        className={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
