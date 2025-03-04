import React, { Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import TicketList from './TicketList';
import TicketForm from './TicketForm';

class Dashboard extends Component {
  state = {
    tickets: [],
  };

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const response = await axios.get('/api/tickets/my', {
        headers: { Authorization: `Bearer ${this.context.token}` },
      });
      this.setState({ tickets: response.data.data });
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  render() {
    return (
      <div className="dashboard">
        <h2>Your Tickets</h2>
        <TicketForm fetchTickets={this.fetchTickets} />
        <TicketList tickets={this.state.tickets} />
      </div>
    );
  }
}

Dashboard.contextType = AuthContext;

export default Dashboard;
