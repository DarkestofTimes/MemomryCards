import { useEffect } from "react";
import { key } from "../key.js";

export const Effects = ({
  data,
  setData,
  reshuffledArray,
  shuffle,
  visited,
  score,
  bestScore,
  setBestScore,
  isOver,
  setIsOver,
}) => {
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
    const filteredShuffled = reshuffledArray.filter(
      (item) => !visited.includes(item.id.toString())
    );
    if (reshuffledArray.length > 0) {
      while (filteredShuffled.length < 1 && !isOver) {
        shuffle();
      }
    }
  }, [reshuffledArray]);

  useEffect(() => {
    shuffle();
    if (score === 50) {
      setIsOver(true);
    }
  }, [score]);

  useEffect(() => {
    if (score > bestScore) {
      // eslint-disable-next-line no-unused-vars
      setBestScore((prev) => score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.pexels.com/v1/search?query=parrot+wild&orientation=portrait&per_page=50";
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
};
