import React, { Component } from 'react';
import axios from 'axios';

class TicketForm extends Component {
  state = {
    title: '',
    description: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    const { fetchTickets } = this.props;

    try {
      await axios.post(
        '/api/tickets',
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTickets();
      this.setState({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
          placeholder="Ticket Title"
        />
        <textarea
          name="description"
          value={this.state.description}
          onChange={this.handleInputChange}
          placeholder="Ticket Description"
        />
        <button type="submit">Create Ticket</button>
      </form>
    );
  }
}

export default TicketForm;
