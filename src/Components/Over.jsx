export const Over = ({ bestScore, setIsHard, prevScore, setIsOver }) => {
  const handleDifficulty = (bool) => {
    setIsHard(bool);
    setIsOver(false);
  };
  return (
    <div className="overScreen">
      <div className="overContainer">
        <h1>
          {prevScore === 0
            ? "Hi!"
            : prevScore < 50
            ? "Womp womp..."
            : "Would you look at that!"}
        </h1>
        <p>
          {prevScore === 0
            ? "Click cards you have not clicked yet."
            : `Score: ${prevScore}`}
        </p>
        <p>Best score: {bestScore}</p>
        <div className="btnWrapper">
          <button
            className="btn"
            data-id="easy"
            onClick={(el) => handleDifficulty(false)}>
            Easy
          </button>
          <button
            className="btn"
            data-id="hard"
            onClick={(el) => handleDifficulty(true)}>
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};
