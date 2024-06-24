import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('/api/complaints'); 
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
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
                <img src={complaint.img_path} alt="Complaint" className="img-fluid mt-2" style={{ maxWidth: '200px' }} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
