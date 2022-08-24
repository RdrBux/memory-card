import React from 'react';

const Scoreboard = ({ score, level, highestScore }) => {
  return (
    <div className="scoreboard">
      Score: {score} Level: {level} Highest Score: {highestScore}
    </div>
  );
};

export default Scoreboard;
