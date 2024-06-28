import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComplaintLogger.css';

const ComplaintLogger = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_email: '',
    user_name: '',
    user_location: '',
    user_message: '',
    uploaded_file: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({...formData, uploaded_file: event.target.files[0] });
  };

  const handleAdminPageRedirect = () => {
    navigate('/admin-dashboard'); 
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('user_email', formData.user_email);
      formDataToSend.append('user_name', formData.user_name);
      formDataToSend.append('user_location', formData.user_location);
      formDataToSend.append('user_message', formData.user_message);
      formDataToSend.append('uploaded_file', formData.uploaded_file);

      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        
      } else {
        alert('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form.');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="container text-center">
      <div className="overlay-background">
        <div className="content">
          <h1 className="alert alert-warning mt-2">IT Complaint Logger</h1>
          <button className="btn btn-warning mt-2" onClick={handleLogout}>
            Logout
          </button>
          <form onSubmit={handleFormSubmit} method="post" encType="multipart/form-data">
            <label>
              Enter your Email:
              <input
                placeholder="Enter Email"
                name="user_email"
                className="form-control mt-2"
                required
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Enter your Name:
              <input
                placeholder="Enter Name"
                name="user_name"
                className="form-control mt-2"
                required
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Enter your Location:
              <input
                placeholder="Enter Location"
                name="user_location"
                className="form-control mt-2"
                required
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Enter your Message:
              <input
                placeholder="Enter Message"
                name="user_message"
                className="form-control mt-2"
                required
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Upload Your File:
              <input
                type="file"
                className="form-control mt-2"
                name="uploaded_file"
                onChange={handleFileChange}
              />
            </label>
            <br />
            <button className="btn btn-warning mt-2">Submit</button>
          </form>
          <button className="btn btn-info mt-4" onClick={handleAdminPageRedirect}>
            Go to Admin Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintLogger;