import React from 'react';

const Card = (props) => {
  const { handleClick, id, color } = props;
  const styles = {
    backgroundColor: color,
    border: color === 'white' ? '1px solid black' : 'none',
    color: color === 'black' ? 'white' : 'inherit',
  };

  return (
    <div className="card" style={styles} onClick={() => handleClick(id)}>
      {color}
    </div>
  );
};

export default Card;
