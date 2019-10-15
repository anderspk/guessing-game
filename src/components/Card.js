import React from "react";

const Card = ({ id, handleCardClick, displayCard, robot }) => {
  return (
    <div className="card" onClick={() => handleCardClick(id, robot)}>
      <img src={`https://robohash.org/${robot}`} alt="" />
      <div className={displayCard ? "" : "card-backside"}></div>
    </div>
  );
};

export default Card;
