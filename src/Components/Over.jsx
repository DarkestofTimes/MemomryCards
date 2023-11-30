export const Over = ({ bestScore, setIsHard, prevScore }) => {
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
        <p>Score:{prevScore}</p>
        <p>Best score:{bestScore}</p>
        <div className="btnWrapper">
          <button
            className="btn"
            data-id="easy"
            onClick={(el) => setIsHard(false)}>
            Easy
          </button>
          <button
            className="btn"
            data-id="hard"
            onClick={(el) => setIsHard(true)}>
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};
