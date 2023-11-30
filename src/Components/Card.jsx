/* eslint-disable react/prop-types */
import { useState } from "react";

export const Card = ({
  item,
  onClick,
  isShut,
  handleAnimationEnd,
  visited,
}) => {
  const [active, setActive] = useState(false);
  const cover =
    active && visited.length !== 0
      ? "rgb(37, 116, 37)"
      : active && visited.length === 0
      ? "red"
      : "rebeccapurple";

  const handleClick = (ev) => {
    onClick(ev);
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1000);
  };

  return (
    <div className="card" data-id={item.id} onClick={handleClick}>
      {isShut && (
        <div
          className="cover"
          onAnimationEnd={handleAnimationEnd}
          style={{ backgroundColor: cover }}></div>
      )}
      <img
        height="350"
        width="233"
        src={item.src.medium}
        alt={item.alt}
        data-id={item.id}
      />
      <a href={item.photographer_url} target="_blank" rel="noreferrer">
        {item.photographer} @ Pexels
      </a>
    </div>
  );
};
