import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "../img/logo-bancabot.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddBet.css";

const AddBet = ({ onSave, onEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newBet, setNewBet] = useState({
    name: "",
    tipster: "",
    date: "",
    match: "",
    odd: "",
    stake: "",
    result: "Pendente",
  });

  const isEditing = location.state && location.state.bet;

  useEffect(() => {
    if (isEditing) {
      setNewBet(location.state.bet);
    }
  }, [isEditing, location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBet((prev) => ({ ...prev, [name]: value }));
  };

  const addBet = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bets/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBet),
      });

      if (response.ok) {
        const data = await response.json();
        onSave(data);
        toast.success("Aposta salva com sucesso!");
        navigate("/view-bets");
      } else {
        throw new Error("Erro ao salvar a aposta");
      }
    } catch (err) {
      toast.error("Erro ao salvar a aposta");
    }
  };

  const editBet = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/bets/update/${newBet.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBet),  
      });

      if (!response.ok) {
        throw new Error("Erro ao editar a aposta");
      }

      const updatedBet = await response.json();
      onEdit(newBet.id, updatedBet); 
      toast.success("Aposta atualizada com sucesso!");
      navigate("/view-bets");
    } catch (error) {
      toast.error("Erro ao editar a aposta");
    }
  };

  const handleSaveBetClick = () => {
    if (isEditing) {
      editBet();
    } else {
      addBet();
    }
  };

  return (
    <div className="add-bet-page">
      <img src={logoImage} alt="BancaBot Logo" className="logo-image" onClick={() => navigate("/")} />
      <div className="add-bet-container">
        <h2>{isEditing ? "Editar Aposta" : "Adicionar Aposta"}</h2>
        <form
          className="add-bet-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveBetClick();
          }}
        >
          <div className="form-row">
            <label>Aposta</label>
            <input
              type="text"
              name="name"
              value={newBet.name}
              onChange={handleInputChange}
              placeholder="Nome da Aposta"
            />
          </div>
          <div className="form-row">
            <label>Tipster</label>
            <input
              type="text"
              name="tipster"
              value={newBet.tipster}
              onChange={handleInputChange}
              placeholder="Nome do Tipster"
            />
          </div>
          <div className="form-row">
            <label>Data</label>
            <input
              type="date"
              name="date"
              value={newBet.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Partida</label>
            <input
              type="text"
              name="match"
              value={newBet.match}
              onChange={handleInputChange}
              placeholder="Nome da Partida"
            />
          </div>
          <div className="form-row">
            <label>Odd</label>
            <input
              type="number"
              name="odd"
              value={newBet.odd}
              onChange={handleInputChange}
              placeholder="Odd"
            />
          </div>
          <div className="form-row">
            <label>Stake</label>
            <input
              type="number"
              name="stake"
              value={newBet.stake}
              onChange={handleInputChange}
              placeholder="Stake"
            />
          </div>
          <div className="form-row">
            <label>Resultado</label>
            <select
              name="result"
              value={newBet.result}
              onChange={handleInputChange}
            >
              <option value="Pendente">Pendente</option>
              <option value="Ganhou">Ganhou</option>
              <option value="Perdeu">Perdeu</option>
              <option value="Empatou">Empatou</option>
            </select>
          </div>
          <button type="submit" className="save-button">
            {isEditing ? "Editar" : "Salvar"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddBet;
