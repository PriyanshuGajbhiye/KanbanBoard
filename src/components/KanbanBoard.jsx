import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Column from "./Column";

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectGroup, setSelectGroup] = useState("user"); // Change default group
  const [orderBy, setOrderBy] = useState("priority");
  const [priorityValues, setPriorityValues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        ); // Replace with your API URL
        const data = await response.json();
        const { tickets: fetchedTickets, users: fetchedUsers } = data;
        setUsers(
          fetchedUsers.map((user) => ({ ...user, name: user.name || user.id }))
        );
        setTickets(fetchedTickets);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const priorityLabels = {
    0: "No priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  const groupedTickets = {};
  tickets.forEach((ticket) => {
    const selectedValue =
      selectGroup === "user" ? ticket.userId : ticket[selectGroup];
    const user = users.find((user) => user.id === selectedValue);
    const groupName = user ? user.name : selectedValue;

    const priorityValue = ticket.priority;
    const priorityGroupName = priorityLabels[priorityValue];

    const groupKey = selectGroup === "priority" ? priorityGroupName : groupName;

    if (!groupedTickets[groupKey]) {
      groupedTickets[groupKey] = [];
    }
    groupedTickets[groupKey].push(ticket);
  });

  Object.keys(groupedTickets).forEach((group) => {
    groupedTickets[group].sort((a, b) => {
      if (orderBy === "priority") {
        return a.priority - b.priority;
      } else if (orderBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  const handleGroupOptionClick = (group) => {
    setSelectGroup(group);
  };

  const handleOrderOptionClick = (order) => {
    setOrderBy(order);
  };

  return (
    <div>
      <div className="navbar">
        <Navbar
          onGroupOptionClick={handleGroupOptionClick}
          onOrderOptionClick={handleOrderOptionClick}
          users={users}
        />
      </div>
      <h1>Kanban Board</h1>
      <div className="line"></div>
      <div className="column" style={{ display: "flex" }}>
        {Object.keys(groupedTickets).map((value) => (
          <Column
            key={value}
            groupedTickets={groupedTickets[value]}
            users={users}
            selectGroup={value}
            orderBy={orderBy}
            priorityLabel={
              orderBy === "priority" && selectGroup === "priority"
                ? priorityLabels[value]
                : null
            }
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
