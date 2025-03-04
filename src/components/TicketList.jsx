import React from 'react';

const TicketList = ({ tickets }) => {
  return (
    <ul>
      {tickets.map(ticket => (
        <li key={ticket.id}>
          {ticket.title} - {ticket.status}
        </li>
      ))}
    </ul>
  );
};

export default TicketList;
