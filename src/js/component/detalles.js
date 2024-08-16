import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
export const Detalles = () => {
    const { type, id } = useParams();
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (store.listaDePersonajes.length === 0) {
            actions.traerPersonajes();
        }
        if (store.listaDePlanetas.length === 0) {
            actions.traerPlanetas();
        }
    }, []);
    const personajes = store.listaDePersonajes;
    const planetas = store.listaDePlanetas;
    // Filtramos solo el personaje o el planeta que corresponde a la ID y al tipo
    const personaje = personajes.find((elemento) => elemento.id === id);
    const planeta = planetas.find((elemento) => elemento.id === id);
    const imageUrl =
        type === "personajes"
            ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
            : `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
    return (
        <div className="bg-dark container-fluid d-flex justify-content-center align-items-center">
            <div className="card m-6 p-3 bg-dark w-50">
                <img src={imageUrl} className="card-img-top" alt="..." />
                <h1 className="card-text text-light">
                    {type === "personajes" ? personaje?.name : planeta?.name}
                </h1>
                <p className="card-text text-light">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                </p>
                <div className="card-text text-light border border-warning p-4">
                    {type === "personajes" && personaje && (
                        <>
                            <p><strong>Name:</strong> {personaje.name}</p>
                            <p><strong>Birth year:</strong> {personaje.birthYear}</p>
                            <p><strong>Gender:</strong> {personaje.gender}</p>
                            <p><strong>Height:</strong> {personaje.height}</p>
                            <p><strong>Skin color:</strong>  {personaje.skinColor}</p>
                            <p><strong>Eye color:</strong> {personaje.eyeColor}</p>
                        </>
                    )}
                    {type === "planetas" && planeta && (
                        <>
                            <p><strong>Name:</strong> {planeta.name}</p>
                            <p><strong>Climate:</strong> {planeta.climate}</p>
                            <p><strong>Population:</strong> {planeta.population}</p>
                            <p><strong>Orbital period:</strong> {planeta.orbitalPeriod}</p>
                            <p><strong>Rotation period:</strong> {planeta.rotationPeriod}</p>
                            <p><strong>Diameter:</strong> {planeta.diameter}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};