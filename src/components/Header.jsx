import React, { useState } from "react";
import "./Header.css";

function Header({ onGroupOptionClick, onOrderOptionClick }) {
  const [isDisplayDropdownOpen, setIsDisplayDropdownOpen] = useState(false);
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);

  const handleDisplayDropdownClick = () => {
    setIsDisplayDropdownOpen(!isDisplayDropdownOpen);
    setIsGroupDropdownOpen(false); // Close the group dropdown
    setIsOrderDropdownOpen(false); // Close the order dropdown
  };

  const handleGroupDropdownClick = () => {
    setIsGroupDropdownOpen(!isGroupDropdownOpen);
    setIsOrderDropdownOpen(false);
  };

  const handleOrderDropdownClick = () => {
    setIsOrderDropdownOpen(!isOrderDropdownOpen);
    setIsGroupDropdownOpen(false);
  };

  return (
    <div className="Header">
      <div className="dropdown">
        <button
          className="dropdown-button"
          onClick={handleDisplayDropdownClick}
        >
          Display
        </button>
        {isDisplayDropdownOpen && (
          <div className="dropdown-options">
            <div className="grouping-container">
              {/* <span>Grouping</span> */}
              <button
                className="grouping-dropdown-button"
                onClick={handleGroupDropdownClick}
              >
                Grouping ▼
              </button>
              {isGroupDropdownOpen && (
                <div className="sub-dropdown">
                  <button onClick={() => onGroupOptionClick("user")}>
                    User
                  </button>
                  <button onClick={() => onGroupOptionClick("priority")}>
                    Priority
                  </button>
                  <button onClick={() => onGroupOptionClick("status")}>
                    Status
                  </button>
                </div>
              )}
            </div>
            <div className="ordering-container">
              {/* <span>Ordering</span> */}
              <button
                className="ordering-dropdown-button"
                onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
              >
                Ordering ▼
              </button>
              {isOrderDropdownOpen && (
                <div className="sub-dropdown">
                  <button onClick={() => onOrderOptionClick("priority")}>
                    Priority
                  </button>
                  <button onClick={() => onOrderOptionClick("title")}>
                    Title
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
