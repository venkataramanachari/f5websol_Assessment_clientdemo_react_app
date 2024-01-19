import React, { useState, useEffect } from 'react';
import * as bs from 'react-bootstrap'
import axios from 'axios';

const ClientModal = ({ onClose, client, onAddOrUpdate }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    // If editing an existing client, populate the form with its data
    if (client) {
      setFormData({
        id: client.id,
        name: client.name,
        phone: client.phone,
        email: client.email,
        address: client.address,
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (client) {
        // Editing an existing client - send a PUT request
        await axios.post(`https://localhost:7103/Api/ManageClient/`, formData);
      } else {
        // Adding a new client - send a POST request
        await axios.post('https://localhost:7103/Api/ManageClient', formData);
      }

      // Update the client list after the operation
      onAddOrUpdate();

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error saving/updating client:', error);
    }
  };

  return (
    <div>
      <h2>{client ? 'Edit Client' : 'Add Client'}</h2>
      <form style={{display:"flex", gap:"5px"}}>
        <label>Name:</label>
        <bs.Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Phone:</label>
        <bs.Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />

        <label>Email:</label>
        <bs.Form.Control type="text" name="email" value={formData.email} onChange={handleChange} />

        <label>Home Address:</label>
        <bs.Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />

        <bs.Button type="button" onClick={handleSubmit}>
          {client ? 'Update' : 'Add'}
        </bs.Button>
        <bs.Button type="button" onClick={onClose}>
          Cancel
        </bs.Button>
      </form>
    </div>
  );
};

export default ClientModal;
