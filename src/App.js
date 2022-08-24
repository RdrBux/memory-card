import { useEffect, useState } from 'react';
import Scoreboard from './components/Scoreboard';
import Card from './components/Card';
import { nanoid } from 'nanoid';

function App() {
  const defaultCards = [
    { id: nanoid(), color: 'red' },
    { id: nanoid(), color: 'blue' },
    { id: nanoid(), color: 'yellow' },
    { id: nanoid(), color: 'green' },
  ];

  const [cards, setCards] = useState(defaultCards);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [level, setLevel] = useState(1);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    setCards((prev) => shuffleArray(prev));
  }, []);

  useEffect(() => {
    setHighestScore((prevScore) => (score >= prevScore ? score : prevScore));
  }, [score]);

  useEffect(() => {
    const colors = [
      'violet',
      'orange',
      'cyan',
      'pink',
      'gray',
      'fuchsia',
      'indigo',
      'white',
      'black',
      'olive',
      'aquamarine',
      'salmon',
      "You weren't supposed to get this far",
    ];
    if (history.length === cards.length) {
      setLevel((prevLevel) => prevLevel + 1);
      setHistory([]);
      setCards((prevCards) =>
        prevCards.concat({
          id: nanoid(),
          color: colors[level - 1],
        })
      );
    }
  }, [level, history, cards]);

  function handleCardClick(id) {
    if (history.includes(id)) {
      setScore(0);
      setHistory([]);
      setLevel(1);
      setCards(defaultCards);
    } else {
      setHistory(history.concat(id));
      setScore((prevScore) => prevScore + 1);
    }
    setCards((prev) => shuffleArray(prev));
  }

  function shuffleArray(array) {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  }

  const cardsDisplay = cards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        color={card.color}
        handleClick={handleCardClick}
      />
    );
  });

  return (
    <div className="App">
      <div className="hero">
        <h1>MEMORY CARDS</h1>
        <p>Can you click each color only once per level?</p>
      </div>
      <Scoreboard score={score} level={level} highestScore={highestScore} />
      <div className="card-container">{cardsDisplay}</div>
    </div>
  );
}

export default App;
