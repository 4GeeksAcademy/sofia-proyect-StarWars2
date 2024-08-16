import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
export const ItemCard = ({ title, gender, hairColor, eyeColor, population, terrain, type, id, name }) => {
  const imageUrl = type === "planetas" && id === "1"
    ? "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Tatooine_%28fictional_desert_planet%29.jpg/220px-Tatooine_%28fictional_desert_planet%29.jpg"
    : type === "personajes"
      ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
      : type === "planetas"
        ? `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`
        : "";
  const { actions } = useContext(Context);
  const [isFavorited, setIsFavorited] = useState(false);
  const nuevoFavorito = () => {
    actions.addFavorites(id, type, title);
    setIsFavorited(!isFavorited);
  };
  return (
    <div className="card m-6 p-3 bg-dark border border-warning" style={{ width: "18rem" }}>
      <img src={imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title text-warning">{title}</h5>
        {gender && <p className="card-text text-light">Gender: {gender}</p>}
        {hairColor && <p className="card-text text-light">Hair color: {hairColor}</p>}
        {eyeColor && <p className="card-text text-light">Eye color: {eyeColor}</p>}
        {population && <p className="card-text text-light">Population: {population}</p>}
        {terrain && <p className="card-text text-light">Terrain: {terrain}</p>}
      </div>
      <div className="d-flex justify-content-between m-2">
        <Link to={`/detalles/${type}/${id}`} className="btn btn-warning">
          See more
        </Link>
        <button onClick={nuevoFavorito} className="btn btn-secondary">{isFavorited ? ':corazón:' : ':corazón_blanco:'}</button>
      </div>
    </div>
  );
};
ItemCard.propTypes = {
  title: propTypes.string.isRequired,
  gender: propTypes.string,
  hairColor: propTypes.string,
  eyeColor: propTypes.string,
  population: propTypes.string,
  terrain: propTypes.string,
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired
};