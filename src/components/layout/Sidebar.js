import React, { useState, useEffect } from "react";
import axios from "axios";
import Timer from "react-compound-timer";

const Sidebar = ({ newGame, game, handleGameOver }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    fetchHighScores();
  }, []);

  const fetchHighScores = async () => {
    const { data } = await axios.get("https://crudpi.io/017852/score");
    setHighScores(data.sort((a, b) => b.score - a.score).splice(0, 10));
  };

  return (
    <div className="sidebar">
      {newGame ? (
        <>
          <div className="game-stats">
            <div className="">
              Time:
              <Timer
                initialTime={90000}
                startImmediately={true}
                direction="backward"
                checkpoints={[{ time: 0, callback: handleGameOver }]}
              >
                <Timer.Minutes />m
                <Timer.Seconds />s
              </Timer>
            </div>
            <div className="">
              Level: <span>{game.level - 1}</span>
            </div>
            <div>
              Score: <span>{game.score}</span>
            </div>
            <div className="">
              Player: <span>{game.player}</span>
            </div>
          </div>
          <div className="high-scores">
            <h2>High Scores</h2>
            <ul>
              {highScores.map((record, i) => (
                <li key={`score${i}`}>{`${i + 1}. ${record.name} - ${
                  record.score
                }`}</li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Sidebar;
