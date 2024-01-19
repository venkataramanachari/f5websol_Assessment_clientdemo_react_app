import React, { useState, useEffect } from 'react';
import ClientModal from './ClientModal';
import * as bs from 'react-bootstrap'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://localhost:7103/Api/GetClients')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  
  const handleAdd = () => {
    setShowModal(true);
    setSelectedClient(null);
  };

  const handleEdit = (client) => {
    setShowModal(true);
    setSelectedClient(client);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');

    if (confirmDelete) {
      axios.get(`https://localhost:7103/api/DeleteClient?id=${id}`)
        .then(() => {
          getData();
        })
        .catch((error) => {
          console.error('Error deleting client:', error);
        });
    }
  };

  const onAddOrUpdate = () =>{
    getData();
  }

  const sendMail = (id) => {
    axios.get(`https://localhost:7103/api/SendMail?id=${id}`)
        .then(() => {
          window.alert('Email sent successfully')
        })
        .catch((error) => {
          console.error('Error Sending Mail:', error);
        });
  };


  return (
    <div style={{padding:"2rem"}}>
      <bs.Button style={{margin:"1rem"}} onClick={handleAdd}>Add Client</bs.Button>
      <bs.Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Home Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the clients array and render table rows */}
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{client.email}</td>
              <td>{client.address}</td>
              <td style={{gap:"5px"}}>
                <button style={{border:0}} onClick={() => handleEdit(client)}><FaIcons.FaPen/></button>
                <button style={{border:0}} onClick={() => handleDelete(client.id)}><FaIcons.FaTrash /></button>
                <button style={{border:0}} onClick={() => sendMail(client.id)}><FaIcons.FaMailBulk /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </bs.Table>

      {showModal && (
        <ClientModal
          onClose={() => setShowModal(false)}
          client={selectedClient}
          onAddOrUpdate={onAddOrUpdate} // Pass the callback function
        />
      )}
    </div>
  );
};

export default ClientTable;
