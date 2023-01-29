import { coloursBackgrounds } from "./constants.js";
import { convertirPesoYAltura, obtenerTipoPokemon } from "./helpers.js";
const section_pokemons = document.querySelector('.section-pokemons');
const infoPokemon = document.querySelector('.section-info');
const eventoSeleccionarCard = (data) => {
    console.log("Hola mundo");
    //console.log(data);
}
const insertarCard = (data) => {
    let div = `
            <div class="card__image">
                <img src=${data.sprites.front_default}>
            </div>
            <div>
                <h4>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h4>
                <p>Height : ${convertirPesoYAltura(data.height)} m</p>
                <p>Weight : ${convertirPesoYAltura(data.weight)} Kg</p>
                <p>Type</p>
                ${obtenerTipoPokemon(data.types)}
            </div>
    `
    const divCard = document.createElement('div');
    divCard.style.background = coloursBackgrounds[data.types[0].type.name]
    divCard.classList.add("card")
    divCard.innerHTML = div
    divCard.addEventListener('click', () => {
        eventoSeleccionarCard(data)
    })
    section_pokemons.appendChild(divCard);
    let i = Number(localStorage.getItem('i'))
    i = (data.id > i) ? data.id : i;
    localStorage.setItem('i',i.toString())
    
}

export{
    insertarCard
}