import { links } from "./constants.js";
import { evoluesToRecursing } from "./helpers.js";

const obtenerInfoPokemon = async (pokemon='') => {
    let data = await fetch(links.POKEAPI_PAGE + pokemon)
    let pokemonData = await data.json();
    if(pokemon===''){
        return pokemonData.results;
    }
    //console.log(pokemonData);
    //console.log(pokemonData)
    // insertarCard(pokemonData)
    return pokemonData;
    //insertarCard(pokemonData)
    //i = (pokemonData.id > i) ? pokemonData.id : i;
    //return i;
}

const obtenerPokemons = async () => {
    let data =  await fetch(links.POKEAPI_PAGE);
    let pokemons = await data.json();
    return pokemons.results;
}
const getAbilities=(abilities)=>{
    const text =  abilities.map(ability=>{
        return ability.ability.name
    })
    return text.toString().replace(',',' ')
}
const getEvolutions=async(species)=>{
    //console.log(species);
    const cadena = await fetch(species.url)
        .then(e=>e.json());
    
    const cadenaEvolucion = await fetch(cadena.evolution_chain.url)
        .then(e=>e.json());
    //console.log(cadenaEvolucion.chain);
    // console.log('--',evoluesToRecursing(cadenaEvolucion.chain,[]));
    const evoluciones = evoluesToRecursing(cadenaEvolucion.chain,[]);
    const dataEvolutions = []
    for (let i = 0; i < evoluciones.length; i++) {
        let a = await obtenerInfoPokemon(evoluciones[i])
        dataEvolutions.push(a)
    }
    return dataEvolutions;
    
}

export  {
    obtenerInfoPokemon,
    // obtenerPokemons,
    getAbilities,
    getEvolutions
}