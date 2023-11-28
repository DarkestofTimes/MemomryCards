import { useState } from "react";
import "../Styles/App.css";
import { Card } from "./Card.jsx";
import { Effects } from "./Effects.jsx";

function App() {
  const savedData = JSON.parse(localStorage.getItem("data")) || [];
  const savedScore = JSON.parse(localStorage.getItem("score")) || 0;
  const [data, setData] = useState(savedData);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(savedScore);
  const [visited, setVisited] = useState([]);
  const [shut, setShut] = useState(false);
  const [reshuffledArray, setReshuffledArray] = useState([]);
  const [isHard, setIsHard] = useState(true);
  const [isOver, setIsOver] = useState(false);

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
    const section = isHard ? filteredNew : newArray.splice(indexScore, 10);
    const filteredVisited = newArray.filter((item) =>
      visited.includes(item.id.toString())
    );
    setReshuffledArray([]);
    const tempArray = [];
    while (tempArray.length < 10 && newArray.length !== 0) {
      if (visited.length > 8 && tempArray.length < 8 && isHard) {
        tempArray.push(
          filteredVisited.splice(
            Math.floor(Math.random() * filteredVisited.length),
            1
          )[0]
        );
      } else if (tempArray.length < 10 && isHard && visited.length > 47) {
        tempArray.push(
          filteredVisited.splice(
            Math.floor(Math.random() * filteredVisited.length),
            1
          )[0]
        );
      } else {
        tempArray.push(
          section.splice(Math.floor(Math.random() * section.length), 1)[0]
        );
      }
    }
    setReshuffledArray([...tempArray]);
  };

  const handleClick = (ev) => {
    if (ev.target.tagName.toLowerCase() !== "a") {
      if (!shut) {
        if (visited.includes(ev.target.getAttribute("data-id"))) {
          setTimeout(() => {
            setVisited([]);
            setScore(0);
            setIsOver(true);
          }, 1000);
        } else {
          setTimeout(() => {
            setVisited([...visited, ev.target.getAttribute("data-id")]);
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
      <div className="textWrapper">
        <h1>Cards!</h1>
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
      />
    </main>
  );
}

export default App;
