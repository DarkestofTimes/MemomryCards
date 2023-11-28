/* eslint-disable react/prop-types */
export const Card = ({ item, onClick, isShut, handleAnimationEnd }) => {
  return (
    <div
      className="card"
      data-id={item.id}
      onClick={onClick}
      style={isShut ? { border: "2px solid black" } : {}}>
      {isShut && (
        <div className="cover" onAnimationEnd={handleAnimationEnd}></div>
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
