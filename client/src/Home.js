import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import backgroundImage from "./img/background-robo.png";
import logoImage from "./img/logo-bancabot-branca.svg";

function Home() {
  const navigate = useNavigate();

  const handleAddBetClick = () => {
    navigate('/add-bet');
  };

  const handleViewBetsClick = () => {
    navigate('/view-bets');
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <div className="home-content">
        <img src={logoImage} alt="BancaBot Logo" className="logo-image" />
        <h1>Gerencie Suas Apostas com Facilidade</h1>

        <p>
          <strong>Centralize</strong> e <strong>acompanhe</strong> o desempenho das suas <strong>apostas</strong> em um único lugar. Organize, monitore e analise cada resultado para <strong>melhorar suas estratégias</strong>.
        </p>
        <div className="button-group">
          <button className="add-bet-button" onClick={handleAddBetClick}>
            Adicionar Aposta
          </button>
          <button className="view-bets-button" onClick={handleViewBetsClick}>
            Ver Minhas Apostas
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
