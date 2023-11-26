/* eslint-disable react/prop-types */
export const Card = ({ item, onClick }) => {
  return (
    <div className="card" data-id={item.id} onClick={onClick}>
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
