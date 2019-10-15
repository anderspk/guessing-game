import React, { useState } from "react";

const Modal = ({ handleNewGame, handlePlayerName, player, gameOver }) => {
  const [showModule, setShowModule] = useState(true);

  const onSubmit = e => {
    setShowModule(false);
    handleNewGame();
  };

  const newGame = () => {
    return (
      <div className="game-over">
        <p>GAME OVER</p>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  };
  return showModule || gameOver ? (
    <div className="modal">
      <div className="menu-container">
        {gameOver ? (
          newGame()
        ) : (
          <>
            {" "}
            <form onSubmit={onSubmit}>
              <label className="name-label" htmlFor="name-input">
                Enter your name:
                <input
                  className="name-input"
                  value={player}
                  onChange={e => handlePlayerName(e.target.value)}
                  id="name-input"
                  type="text"
                />
              </label>
            </form>
            <button className="new-game" onClick={() => onSubmit()}>
              New Game
            </button>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
