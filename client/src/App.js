import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddBet from "./components/AddBet1";
import ViewBets from "./components/ViewBets";
import { toast, ToastContainer } from "react-toastify";
import Home from "./Home";

function App() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    fetchBets();
  }, []);

  const fetchBets = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bets/");
      const data = await response.json();
      setBets(data);
    } catch (err) {
      console.error("Erro ao buscar as apostas:", err);
    }
  };

  const handleSaveBet = (newBet) => {
    setBets((prev) => [...prev, newBet]);
  };

  const handleDeleteBet = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/bets/delete/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBets((prev) => prev.filter((bet) => bet.id !== id));
        toast.success("Aposta deletada com sucesso!");
      } else {
        throw new Error("Erro ao deletar a aposta");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao deletar a aposta");
    }
  };

  const handleEditBet = (id, updatedBet) => {
    setBets((prev) => {
      const updatedBets = prev.map((bet) =>
        bet.id === id ? updatedBet : bet
      );
      return updatedBets;
    });
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/add-bet"
          element={<AddBet onSave={handleSaveBet} onEdit={handleEditBet} />}
        />
        <Route
          path="/view-bets"
          element={<ViewBets bets={bets} onDelete={handleDeleteBet} onEdit={handleEditBet} />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
