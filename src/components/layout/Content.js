import React, { useState, useEffect } from "react";
import Card from "../Card";

const Content = ({ cards, handleNextLevel, scorePoint }) => {
  const [solvedCards, setSolvedCards] = useState([]);
  const [lock, setLock] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!removed) {
      if (solvedCards.length % 2 === 0) {
        setLock(true);
        setTimeout(() => {
          const first = solvedCards[solvedCards.length - 1];
          const second = solvedCards[solvedCards.length - 2];
          if (first && second && first.robot !== second.robot) {
            removeTwoLatestCards();
          } else {
            if (solvedCards.length > 0 && solvedCards.length === cards.length) {
              setSolvedCards([]);
              handleNextLevel();
            } else if (solvedCards.length > 0) scorePoint();
          }
          setLock(false);
        }, 250);
      }
    } else setRemoved(false);
  }, [solvedCards]);

  const removeTwoLatestCards = async () => {
    setRemoved(true);
    setSolvedCards(solvedCards.splice(0, solvedCards.length - 2));
  };

  const handleCardClick = (id, robot) => {
    if (!lock) {
      setSolvedCards([...solvedCards, { id, robot }]);
    }
  };

  return (
    <div className="content">
      {cards.map((robot, i) => (
        <Card
          key={i}
          id={i}
          robot={robot}
          handleCardClick={handleCardClick}
          displayCard={solvedCards.some(r => r.id === i)}
        />
      ))}
    </div>
  );
};

export default Content;
