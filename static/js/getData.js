import { links } from "./constants.js";
import { insertarCard } from "./renderData.js";

const obtenerInfoPokemon = async (pokemon) => {
    let data = await fetch(links.POKEAPI_PAGE + pokemon)
    let pokemonData = await data.json();
    //console.log(pokemonData);
    //console.log(pokemonData)
    // insertarCard(pokemonData)
    return pokemonData;
    //insertarCard(pokemonData)
    //i = (pokemonData.id > i) ? pokemonData.id : i;
    //return i;
}

const obtenerPokemons = async () => {
    let data =  await fetch(links.POKEAPI_PAGE)
        .then(data => data.json())
        .then(pokemons => pokemons.results)
    return data
}
const getAbilities=(abilities)=>{
    const text =  abilities.map(ability=>{
        return ability.ability.name
    })
    return text.toString().replace(',',' ')
}


export  {
    obtenerInfoPokemon,
    obtenerPokemons,
    getAbilities
}