import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fetchComplaints = async () => {
  try {
    const response = await fetch('/api/complaints');
    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    const data = await response.json();
    console.log('Data from API:', data); // Check the data from API
    return data;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return [];
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints().then(data => {
      console.log('Data before setting state:', data); // Check the data before setting state
      setComplaints(data);
    });
  }, []);

  console.log('Complaints state:', complaints); // Check the complaints state

  const handleBackToComplaintLogger = () => {
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h1 className="alert alert-info text-center">Admin - Complaint Logger</h1>
      <div id="complaints-container" className="mt-4">
        <ul className="list-group">
          {complaints.map(complaint => (
            <li key={complaint._id} className="list-group-item">
              <strong>Email:</strong> {complaint.email}<br />
              <strong>Name:</strong> {complaint.name}<br />
              <strong>Location:</strong> {complaint.location}<br />
              <strong>Message:</strong> {complaint.message}<br />
              {complaint.img_path && (
                <img src={`http://localhost:5000/${complaint.img_path}`} alt="Complaint" className="img-fluid mt-2" style={{ maxWidth: '200px' }} />
              )}
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-info mt-4" onClick={handleBackToComplaintLogger}>
        Back to Complaint Logger
      </button>
    </div>
  );
};

export default AdminDashboard;