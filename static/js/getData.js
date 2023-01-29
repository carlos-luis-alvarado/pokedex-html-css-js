import { insertarCard } from "./renderData.js";

const obtenerInfoPokemon = async (url, pokemon,i) => {
    let data = await fetch(url + pokemon)
    let pokemonData = await data.json();
    console.log(pokemonData);
    insertarCard(pokemonData)
    //i = (pokemonData.id > i) ? pokemonData.id : i;
    //return i;
}

const obtenerPokemons = async (url) => {
    let data =  await fetch(url)
        .then(data => data.json())
        .then(pokemons => pokemons.results)
    return data
}

export  {
    obtenerInfoPokemon,
    obtenerPokemons
}