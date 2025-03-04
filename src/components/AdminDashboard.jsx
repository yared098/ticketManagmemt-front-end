import React, { Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

class AdminDashboard extends Component {
  state = {
    users: [],
    tickets: [],
  };

  componentDidMount() {
    this.fetchUsers();
    this.fetchTickets();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${this.context.token}` },
      });
      this.setState({ users: response.data.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchTickets = async () => {
    try {
      const response = await axios.get('/api/tickets', {
        headers: { Authorization: `Bearer ${this.context.token}` },
      });
      this.setState({ tickets: response.data.data });
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  render() {
    return (
      <div className="admin-dashboard flex p-6">
        {/* Left Side - Users */}
        <div className="w-1/3 p-4">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <ul>
            {this.state.users.map(user => (
              <li key={user.id} className="border-b py-2">
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Tickets */}
        <div className="w-2/3 p-4">
          <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
          <ul>
            {this.state.tickets.map(ticket => (
              <li key={ticket.id} className="border-b py-2">
                {ticket.title} - {ticket.status}
                {/* Add functionality for updating ticket status */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

AdminDashboard.contextType = AuthContext;

export default AdminDashboard;
