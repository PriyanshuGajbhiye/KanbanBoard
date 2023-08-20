import React from "react";
import Header from "./Header";

function Navbar({ onGroupOptionClick, onOrderOptionClick }) {
  return (
    <div>
      <Header
        onGroupOptionClick={onGroupOptionClick}
        onOrderOptionClick={onOrderOptionClick}
      />
    </div>
  );
}

export default Navbar;
