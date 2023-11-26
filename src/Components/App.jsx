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
  const reshuffledArray = [];

  const shuffle = () => {
    const newArray = [...data];
    const indexScore = score <= 15 ? 0 : score <= 30 ? 15 : 30;
    const section = newArray.splice(indexScore, 15);
    reshuffledArray.length = 0;
    while (reshuffledArray.length < 15 && newArray.length !== 0) {
      reshuffledArray.push(
        section.splice(Math.floor(Math.random() * section.length), 1)[0]
      );
    }
  };

  useEffect(() => {
    const newArray = [...data];
    const tempArr = [];
    while (newArray.length > 0) {
      tempArr.push(
        newArray.splice(Math.floor(Math.random() * newArray.length), 1)[0]
      );
    }
    while (tempArr.length > 0) {
      newArray.push(tempArr.pop());
    }
    // eslint-disable-next-line no-unused-vars
    setData((prevData) => newArray);
  }, []);

  useEffect(() => {
    const filteredShuffledData = reshuffledArray.filter(
      (item) => !visited.includes(item.id)
    );
    if (filteredShuffledData.length < 3) {
      shuffle();
    }
  }, [reshuffledArray]);

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
        {reshuffledArray.length === 0 ? (
          <p>Loading...</p>
        ) : (
          reshuffledArray.map((item) => (
            <Card key={item.id} item={item} onClick={handleClick} />
          ))
        )}
      </div>
    </main>
  );
}

export default App;
