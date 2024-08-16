import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Navbar = () => {
    const { store } = useContext(Context);
    const { listaDeFavoritos } = store;
    return (
        <nav className="navbar navbar-dark bg-dark p-3">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX6MK34zw_YfhT1F26_4dFyF5Rc8v8_ZexPg&ssrc/img/logoStarWars.png"
                className="img-fluid"
                alt="Logo Star Wars"
                style={{ width: 70, height: 50 }}
            />
            <div className="btn-group p-3">
                <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Favorites
                </button>
                <ul className="dropdown-menu p-10" style={{ textAlign: "left" }}>
                    {listaDeFavoritos.length > 0 ? (
                        listaDeFavoritos.map((favorito, index) => (
                            <li key={index}>
                                <Link to={`/detalles/${favorito.type}/${favorito.id}`} className="dropdown-item">
                                    {favorito.type === "personajes" ? `${favorito.name}` : `${favorito.name}`}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="dropdown-item">No favorites</li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

