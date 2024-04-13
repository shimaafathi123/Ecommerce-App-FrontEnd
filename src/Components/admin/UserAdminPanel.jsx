import   { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from '../../axios/axiosInstance';

const UserAdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/users/');
      console.log(response)
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}/delete`);
      fetchUsers();  
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`/admin/users/${userId}/`);
      console.log('User by ID:', response.data);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
    }
  };

  return (
    <Container>
      <h1>Admin Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="info" onClick={() => getUserById(user.id)}>View</Button>
                <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserAdminPanel;
