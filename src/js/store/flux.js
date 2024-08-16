const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listaDePersonajes: [],
            listaDePlanetas: [],
            listaDeFavoritos: []
        },
        actions: {
            traerPersonajes: async () => {
                try {
                    const result = await fetch("https://www.swapi.tech/api/people");
                    const data = await result.json();
                    const dataPeople = data.results;
                    const personajesDetalles = await Promise.all(
                        dataPeople.map(async (personaje) => {
                            const res = await fetch(`https://www.swapi.tech/api/people/${personaje.uid}`);
                            let detalle = await res.json();
                            let propiedadesPersonaje = {
                                name: detalle.result.properties.name,
                                gender: detalle.result.properties.gender,
                                eyeColor: detalle.result.properties.eye_color,
                                hairColor: detalle.result.properties.hair_color,
                                id: detalle.result.uid,
                                birthYear: detalle.result.properties.birth_year,
                                height: detalle.result.properties.height,
                                skinColor: detalle.result.properties.skin_color
                            };
                            return propiedadesPersonaje;
                        })
                    );
                    setStore({ listaDePersonajes: personajesDetalles });
                } catch (err) {
                    console.error(err);
                }
            },
            traerPlanetas: async () => {
                try {
                    const resultPlanet = await fetch("https://www.swapi.tech/api/planets/");
                    const dataPlanet = await resultPlanet.json();
                    const dataPlanets = dataPlanet.results;
                    const planetasDetalles = await Promise.all(
                        dataPlanets.map(async (planet) => {
                            const res = await fetch(`https://www.swapi.tech/api/planets/${planet.uid}`);
                            let detalle = await res.json();
                            let propiedadesPlaneta = {
                                name: detalle.result.properties.name,
                                climate: detalle.result.properties.climate,
                                population: detalle.result.properties.population,
                                orbitalPeriod: detalle.result.properties.orbital_period,
                                rotationPeriod: detalle.result.properties.rotation_period,
                                diameter: detalle.result.properties.diameter,
                                terrain: detalle.result.properties.terrain,
                                id: detalle.result.uid
                            };
                            return propiedadesPlaneta;
                        })
                    );
                    setStore({ listaDePlanetas: planetasDetalles });
                } catch (err) {
                    console.error(err);
                }
            },
            addFavorites: (id, type, name, title) => {
                const { listaDeFavoritos } = getStore();
                const foundIndex = listaDeFavoritos.findIndex(
                    (element) => element.id === id && element.type === type
                );
                if (foundIndex !== -1) {
                    const newFavorites = listaDeFavoritos.filter(
                        (element, index) => index !== foundIndex
                    );
                    setStore({ listaDeFavoritos: newFavorites });
                } else {
                    const newFavorites = [...listaDeFavoritos, { id, type, name, title }];
                    setStore({ listaDeFavoritos: newFavorites });
                }
            },
        }
    };
};
export default getState;