import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/add-bet" activeClassName="active">Adicionar Aposta</NavLink>
      <NavLink to="/view-bets" activeClassName="active">Minhas Apostas</NavLink>
    </nav>
  );
}

export default Navbar;
