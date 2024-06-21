// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton/BackButton';

const CELL_SIZE = 20;
const WIDTH = 300;
const HEIGHT = 300;

const getRandomPosition = () => {
  return {
    x: Math.floor((Math.random() * WIDTH) / CELL_SIZE) * CELL_SIZE,
    y: Math.floor((Math.random() * HEIGHT) / CELL_SIZE) * CELL_SIZE
  };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            head.y -= CELL_SIZE;
            break;
          case 'DOWN':
            head.y += CELL_SIZE;
            break;
          case 'LEFT':
            head.x -= CELL_SIZE;
            break;
          case 'RIGHT':
            head.x += CELL_SIZE;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomPosition());
        } else {
          newSnake.pop();
        }

        if (
          head.x < 0 ||
          head.x >= WIDTH ||
          head.y < 0 ||
          head.y >= HEIGHT ||
          newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 200);
    return () => clearInterval(intervalId);
  }, [direction, food, gameOver]);

  const restartGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setFood(getRandomPosition());
    setDirection('RIGHT');
    setGameOver(false);
  };

  const handleSwipe = (direction) => {
    setDirection(direction);
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="fixed top-4 left-4 z-20 lg:left-[280px]">
      <BackButton />
    </div>
    <h1 className="text-3xl font-bold mb-4">Snake Game</h1>
    <div className="relative bg-gray-800" style={{ width: WIDTH, height: HEIGHT }}>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="absolute bg-green-500"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: segment.x,
            top: segment.y
          }}
        />
      ))}
      <div
        className="absolute bg-red-500"
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          left: food.x,
          top: food.y
        }}
      />
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-center">
            <p className="text-2xl mb-4">Game Over</p>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="flex mt-4 space-x-4">
      <div className="flex flex-col">
        <button
          onClick={() => handleSwipe('UP')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-2"
        >
          ▲
        </button>
        <div className="flex justify-between">
          <button
            onClick={() => handleSwipe('LEFT')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
          >
            ◄
          </button>
          <button
            onClick={() => handleSwipe('RIGHT')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            ►
          </button>
        </div>
        <button
          onClick={() => handleSwipe('DOWN')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2"
        >
          ▼
        </button>
      </div>
    </div>
  </div>
);

};

export default SnakeGame;
