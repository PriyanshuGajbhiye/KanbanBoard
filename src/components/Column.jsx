// Column.js
import React from "react";
import "./KanbanBoard.css";

function Column({ groupedTickets, users, selectGroup, orderpriorityLabel }) {
  return (
    <div className="column">
      <h2>{selectGroup}</h2>
      <ul className="list">
        {groupedTickets.map((ticket) => (
          <li key={ticket.id} className="ticket">
            <strong>{ticket.id}</strong>
            <br />
            {ticket.title}
            <br />
            {ticket.tag}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Column;
