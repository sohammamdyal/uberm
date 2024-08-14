import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./../styles/AdFeed.css";
import { MessagesContext } from "./../context/MessagesContext";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const setMessages = useContext(MessagesContext);
  useEffect(() => {
    fetchFeedbacks();
  }, []);
  

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedbacks');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const sendMessageToUser = async (message) => {
    try {
      await axios.post('http://localhost:5000/api/messages', { message });
    } catch (error) {
      console.error('Error sending message to user:', error);
    }
  };

  const handleRemove = async (index) => {
    const feedbackToRemove = feedbacks[index];
    const feedbackId = feedbackToRemove._id;

    try {
      const response = await fetch(`http://localhost:5000/api/feedbacks/${feedbackId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newFeedbacks = feedbacks.filter((_, i) => i !== index);
        setFeedbacks(newFeedbacks);
        const message = `Feedback with ID ${feedbackId} has been removed.`;
        Swal.fire("Feedback Removed!", "The feedback has been successfully removed.", "success");
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          console.log("Updated Messages:", updatedMessages); // Debugging
          return updatedMessages;
        });
       
      } else {
        const errorText = await response.text();
        console.error('Error removing feedback:', errorText);
      }
    } catch (error) {
      console.error('Error removing feedback:', error);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0, fontWeight: "bold", fontSize: 35, marginBottom: 15, color: "#333" }}>
        Manage Feedback
      </h1>
      <table>
        <thead>
          <tr>
            <th>Seq</th>
            <th>ID</th>
            <th>Email</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback, index) => (
            <tr key={feedback._id}>
              <td>{index + 1}</td>
              <td>{feedback._id}</td>
              <td>{feedback.email}</td>
              <td>{feedback.feedback}</td>
              <td>{feedback.rating} / 5</td>
              <td>
                <button onClick={() => handleRemove(index)} className="removeButton">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
