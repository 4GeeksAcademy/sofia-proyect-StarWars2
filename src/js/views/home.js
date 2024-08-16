import React, { useContext, useEffect } from "react";
import { ItemCard } from "../component/itemCard";
import { Context } from "../store/appContext";
import { detalles } from "../component/detalles"
import "../../styles/home.css";
export const Home = () => {
    const {store, actions}= useContext(Context)
    const personajes = store.listaDePersonajes;
    useEffect(()=> {
        actions.traerPersonajes();
        actions.traerPlanetas();
    }, [])
    const planetas = store.listaDePlanetas;
    return (
        <div className= "container-fluid bg-dark ">
            <h2>Characters</h2>
            <div className="row">
                {personajes.map((elemento) => (
                    <ItemCard
                        key= {elemento.id}
                        title= {elemento.name}
                        gender = {elemento.gender}
                        hairColor= {elemento.hairColor}
                        eyeColor={elemento.eyeColor}
                        type = "personajes"
                        id= {elemento.id}
                    />)
                )}
            </div>
            <h2>Planets</h2>
            <div className="row">
             {planetas.map((elemento) => (
                    <ItemCard
                        key= {elemento.id}
                        title= {elemento.name}
                        terrain = {elemento.terrain}
                        population= {elemento.population}
                        type = "planetas"
                        id= {elemento.id}
                    />)
             )}
            </div>
        </div>
    )
};