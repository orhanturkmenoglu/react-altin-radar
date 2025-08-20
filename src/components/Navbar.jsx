import React from "react";

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
function Navbar({ links }) {
  return (
    <nav className="navbar">
      <NavLink
        to={"/"}
        className={"navbar-logo"}
      >
        Harem Altın
      </NavLink>
      <ul className="navbar-menu">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
