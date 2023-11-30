import { useState } from "react";
import "../Styles/App.css";
import { Card } from "./Card.jsx";
import { Effects } from "./Effects.jsx";
import { Over } from "./Over.jsx";

function App() {
  const savedData = JSON.parse(localStorage.getItem("data")) || [];
  const savedScore = JSON.parse(localStorage.getItem("score")) || 0;
  const [data, setData] = useState(savedData);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(savedScore);
  const [visited, setVisited] = useState([]);
  const [shut, setShut] = useState(false);
  const [reshuffledArray, setReshuffledArray] = useState([]);
  const [isHard, setIsHard] = useState(null);
  const [isOver, setIsOver] = useState(true);
  const [prevScore, setPrevScore] = useState(0);

  const randomIndx = (array) => {
    return array.splice(Math.floor(Math.random() * array.length), 1)[0];
  };

  const shuffle = () => {
    const newArray = [...data];
    const indexScore =
      score <= 9
        ? 0
        : score <= 19
        ? 10
        : score <= 29
        ? 20
        : score <= 39
        ? 30
        : 40;
    const filteredNew = newArray.filter(
      (item) => !visited.includes(item.id.toString())
    );
    const filteredVisited = newArray.filter((item) =>
      visited.includes(item.id.toString())
    );
    const section = isHard ? filteredNew : newArray.splice(indexScore, 10);

    setReshuffledArray([]);
    const tempArray = [];
    while (tempArray.length < 10 && newArray.length !== 0) {
      if (visited.length > 8 && tempArray.length < 8 && isHard) {
        tempArray.push(randomIndx(filteredVisited));
      } else if (tempArray.length < 10 && isHard && visited.length > 47) {
        tempArray.push(randomIndx(filteredVisited));
      } else {
        tempArray.push(randomIndx(section));
      }
    }
    setReshuffledArray([...tempArray]);
  };

  const handleClick = (ev) => {
    if (ev.target.tagName.toLowerCase() !== "a") {
      if (!shut) {
        if (
          visited.includes(ev.target.getAttribute("data-id")) ||
          score === 50
        ) {
          setVisited([]);
          setTimeout(() => {
            setPrevScore(score);
            setScore(0);
            setIsOver(true);
          }, 1000);
        } else {
          setVisited([...visited, ev.target.getAttribute("data-id")]);
          setTimeout(() => {
            setScore((score) => score + 1);
          }, 1000);
        }
        setShut(true);
      }
    }
  };

  const handleAnimationEnd = () => {
    setShut(false);
  };

  return (
    <main>
      {isOver && (
        <Over
          score={score}
          bestScore={bestScore}
          setIsHard={setIsHard}
          prevScore={prevScore}
        />
      )}

      <div className="textWrapper">
        <h2 className="score">Score:{score}</h2>
        <h2 className="bestScore">Best score:{bestScore}</h2>
        <p>Click cards you have not clicked yet.</p>
      </div>
      <div className="container">
        {reshuffledArray.length === 0 ? (
          <p>Loading...</p>
        ) : (
          reshuffledArray.map((item, index) => (
            <Card
              key={index}
              item={item}
              onClick={handleClick}
              isShut={shut}
              handleAnimationEnd={handleAnimationEnd}
              visited={visited}
            />
          ))
        )}
      </div>
      <Effects
        data={data}
        setData={setData}
        reshuffledArray={reshuffledArray}
        shuffle={shuffle}
        visited={visited}
        score={score}
        bestScore={bestScore}
        setBestScore={setBestScore}
        isOver={isOver}
        setIsOver={setIsOver}
        isHard={isHard}
        setIsHard={setIsHard}
      />
    </main>
  );
}

export default App;
