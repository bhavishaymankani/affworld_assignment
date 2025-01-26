import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";  
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"; 

const Header = ({onLogout}) => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   sessionStorage.removeItem("isAuthenticated");
  //   navigate("/");  
  //   window.location.reload();  
  // };

  return (
    <nav className="header-container">
      <div className="nav-center">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "nav-link selected-tab" : "nav-link")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/feed"
          className={({ isActive }) => (isActive ? "nav-link selected-tab" : "nav-link")}
        >
          Feed
        </NavLink>
      </div>
      <button className="logout-btn" onClick={onLogout}>
        <FaSignOutAlt size={24} /> 
      </button>
    </nav>
  );
};

export default Header;
