import { useState, useEffect } from "react";
import "../Styles/App.css";
import { Card } from "./Card.jsx";
import { key } from "../key.js";

function App() {
  const savedData = JSON.parse(localStorage.getItem("data")) || [];
  const savedScore = JSON.parse(localStorage.getItem("score")) || 0;
  const [data, setData] = useState(savedData);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(savedScore);
  const [visited, setVisited] = useState([]);
  const reshuffledData = [];

  const shuffle = () => {
    const newArray = [...data];
    reshuffledData.length = 0;
    while (reshuffledData.length < 15 && newArray.length !== 0) {
      reshuffledData.push(
        newArray.splice(Math.floor(Math.random() * newArray.length), 1)[0]
      );
    }
  };

  useEffect(() => {
    const filteredShuffledData = reshuffledData.filter(
      (item) => !visited.includes(item.id)
    );
    if (filteredShuffledData.length < 3) {
      shuffle();
    }
  }, [reshuffledData]);

  const handleClick = (ev) => {
    if (ev.target.tagName.toLowerCase() !== "a") {
      if (visited.includes(ev.target.getAttribute("data-id"))) {
        setVisited([]);
        setScore(0);
      } else {
        setVisited([...visited, ev.target.getAttribute("data-id")]);
        setScore((score) => score + 1);
      }
      shuffle();
    }
  };

  useEffect(() => {
    if (score > bestScore) {
      // eslint-disable-next-line no-unused-vars
      setBestScore((prev) => score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.pexels.com/v1/search?query=parrot+wild&orientation=portrait&per_page=45";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: key,
          },
        });
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const retrievedData = await response.json();
        // eslint-disable-next-line no-unused-vars
        setData((prevData) => [...retrievedData.photos]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (data.length === 0) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(bestScore));
  }, [bestScore]);

  useEffect(() => {
    if (data.length > 0) localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  shuffle();
  return (
    <main>
      <div className="textWrapper">
        <h1>Cards!</h1>
        <h2 className="score">Score:{score}</h2>
        <h2 className="bestScore">Best score:{bestScore}</h2>
        <p>Click cards you have not clicked yet.</p>
      </div>
      <div className="container">
        {reshuffledData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          reshuffledData.map((item) => (
            <Card key={item.id} item={item} onClick={handleClick} />
          ))
        )}
      </div>
    </main>
  );
}

export default App;
