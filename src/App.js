import React, { useState, useEffect } from "react";
import "./App.css";
import Content from "./components/layout/Content";
import Sidebar from "./components/layout/Sidebar";
import Modal from "./components/layout/Modal";
import axios from "axios";

function App() {
  const [newGame, setNewGame] = useState(false);
  const [player, setPlayer] = useState("");
  const [level, setLevel] = useState(2);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver)
      axios.post("https://crudpi.io/017852/score", {
        name: player,
        score: score
      });
    else setCards(createCards());
  }, [level, gameOver]);

  const createCards = () => {
    let cards = [];
    for (let i = 0; i < level; i++) {
      cards.push(i);
      cards.push(i);
    }
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const handlePlayerName = playerName => {
    setPlayer(playerName);
  };

  const onNewGame = e => {
    e && e.preventDefault();
    setScore(0);
    setNewGame(true);
  };

  const onScorePoint = () => {
    const newScore = score + 10 * level;
    newScore > score && setScore(newScore);
  };

  const handleNextLevel = () => {
    const newScore = score + 100 * Math.ceil(level / 2);
    newScore > score && setScore(newScore);
    setLevel(level + 1);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };
  return (
    <div className="App">
      <Content
        handleNextLevel={handleNextLevel}
        cards={cards}
        scorePoint={onScorePoint}
      />
      <Sidebar
        newGame={newGame}
        game={{ player, level, score }}
        handleGameOver={handleGameOver}
      />
      <Modal
        handleNewGame={onNewGame}
        handlePlayerName={handlePlayerName}
        player={player}
        gameOver={gameOver}
      />
    </div>
  );
}

export default App;
