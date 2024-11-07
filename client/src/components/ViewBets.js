import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../img/logo-bancabot.svg";
import "./ViewBets.css";

// Função para buscar as apostas da API
const fetchBets = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/bets/"); // Endereço da API Django
    if (!response.ok) {
      throw new Error("Erro ao buscar apostas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar apostas:", error);
    return [];
  }
};

const ViewBets = ({ bets, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    const betToEdit = bets.find((bet) => bet.id === id);
    navigate("/add-bet", { state: { bet: betToEdit } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta aposta?")) {
      try {
        await onDelete(id); 
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  return (
    <div className="view-bets-page">
      <img
        src={logoImage}
        alt="BancaBot Logo"
        className="logo-image"
        onClick={() => navigate("/")}
      />
      <div className="view-bets-container">
        <h2>Apostas Registradas</h2>
        <table className="bets-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipster</th>
              <th>Data</th>
              <th>Partida</th>
              <th>Odd</th>
              <th>Stake</th>
              <th>Resultado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {bets.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Nenhuma aposta registrada.
                </td>
              </tr>
            ) : (
              bets.map((bet) => (
                <tr key={bet.id}>
                  <td>{bet.name}</td>
                  <td>{bet.tipster}</td>
                  <td>{bet.date}</td>
                  <td>{bet.match}</td>
                  <td>{bet.odd}</td>
                  <td>{bet.stake}</td>
                  <td>{bet.result}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(bet.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(bet.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="actions">
          <Link to="/add-bet">
            <button className="add-bet-button">Adicionar Nova Aposta</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewBets;
