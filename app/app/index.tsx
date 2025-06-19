import React, { useState, useEffect } from "react";

const RacingGame = () => {
  const [carPosition, setCarPosition] = useState(1); // Tracks car's lane (0, 1, 2)
  const [obstaclePosition, setObstaclePosition] = useState(0); // Tracks obstacle Y position
  const [obstacleLane, setObstacleLane] = useState(1); // Random lane for the obstacle
  const [score, setScore] = useState(0); // Tracks the score
  const [isGameOver, setIsGameOver] = useState(false); // Tracks game over state

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === "ArrowLeft" && carPosition > 0) {
      setCarPosition(carPosition - 1);
    } else if (e.key === "ArrowRight" && carPosition < 2) {
      setCarPosition(carPosition + 1);
    }
  };

  useEffect(() => {
    const moveObstacle = setInterval(() => {
      setObstaclePosition((prev) => {
        if (prev >= 400) {
          setObstacleLane(Math.floor(Math.random() * 3)); // Reset obstacle lane
          setScore((prevScore) => prevScore + 1); // Increment score
          return 0; // Reset obstacle position
        }
        return prev + 10;
      });
    }, 100);
    return () => clearInterval(moveObstacle);
  }, []);

  useEffect(() => {
    if (obstaclePosition >= 360 && obstacleLane === carPosition) {
      setIsGameOver(true); // Collision detected
    }
  }, [obstaclePosition, obstacleLane, carPosition]);

  useEffect(() => {
    if (!isGameOver) {
      window.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [carPosition, isGameOver]);

  const resetGame = () => {
    setCarPosition(1);
    setObstaclePosition(0);
    setObstacleLane(1);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div
      style={{
        width: "300px",
        height: "400px",
        margin: "50px auto",
        position: "relative",
        backgroundColor: "#000",
        border: "2px solid #fff",
        overflow: "hidden",
      }}
    >
      <h2 style={{ color: "#fff", textAlign: "center", margin: 0 }}>
        Score: {score}
      </h2>
      {isGameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h1>Game Over</h1>
          <button
            onClick={resetGame}
            style={{
              padding: "10px 20px",
              backgroundColor: "#fff",
              border: "none",
              cursor: "pointer ",
            }}
          >
            Restart
          </button>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: `${carPosition * 100}px`,
          width: "80px",
          height: "40px",
          backgroundColor: "#0f0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${obstaclePosition}px`,
          left: `${obstacleLane * 100}px`,
          width: "80px",
          height: "40px",
          backgroundColor: "#f00",
        }}
      />
    </div>
  );
};

export default RacingGame;
