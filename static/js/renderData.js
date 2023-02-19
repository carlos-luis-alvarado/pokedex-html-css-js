import { coloursBackgrounds, content } from "./constants.js";
import { convertirPesoYAltura, obtenerTipoPokemon ,convertirAlturaEn,convertirPesoEn, getAbilities } from "./helpers.js";
const section_pokemons = document.querySelector('.section-pokemons');
const infoPokemon = document.querySelector('.section-info');



const eventoSeleccionarCard = (data) => {
    let peso = convertirPesoYAltura(data.weight);
    let altura = convertirPesoYAltura(data.height);
    const info_pokemon = document.querySelector('.info-pokemon')
    //info_pokemon.innerHTML = div;
    info_pokemon.style.background=coloursBackgrounds[data.types[0].type.name]
    const data_name = document.querySelector('.data-name');
    const data_img = document.querySelector('.data-img');
    data_name.innerHTML = data.name;
    data_img.src = data.sprites.other.home.front_default;
    const arreglo = document.querySelectorAll('.info-items');
    const infoRender = document.querySelector('#info-render');
    
    infoRender.innerHTML= `
                    <ul class="info-pokemon__data">
                        <li>Species : ${convertirPesoYAltura(data.weight)} </li>
                        <li>Height : ${altura} m (${convertirAlturaEn(altura)} ft)</li>
                        <li>Weight : ${peso} kg (${convertirPesoEn(altura)} lbs)</li>
                        <li>Abilities: ${getAbilities(data.abilities)}</li>
                    </ul>
                    <h4>Breeding</h4>
                    <ul class="info-pokemon__data">
                        <li>Gender</li>
                        <li>Eggs Groups</li>
                        <li>Eggs clicle</li>
                    </ul>`
    const activa = document.querySelector('.activa')
    activa.classList.remove('activa')
    arreglo[0].classList.add('activa')
    
    //activa.classList.remove('activa')
    arreglo.forEach((element,idx)=>{
        
        element.addEventListener('click',(e)=>{
            e.preventDefault();
            //const activa = document.querySelector('.activa')
            activa.classList.remove('activa')
            element.classList.add('activa');
            
            //infoRender.innerHTML=content[element.textContent]
            
            switch(element.textContent){

                case "About":
                    infoRender.innerHTML= `
                    <ul class="info-pokemon__data">
                        <li>Species : ${convertirPesoYAltura(data.weight)} </li>
                        <li>Height : ${altura} m (${convertirAlturaEn(altura)} ft)</li>
                        <li>Weight : ${peso} kg (${convertirPesoEn(altura)} lbs)</li>
                        <li>Abilities: ${getAbilities(data.abilities)}</li>
                    </ul>
                    <h4>Breeding</h4>
                    <ul class="info-pokemon__data">
                        <li>Gender</li>
                        <li>Eggs Groups</li>
                        <li>Eggs clicle</li>
                    </ul>`
                break;
                case "Base Stats":
                    infoRender.innerHTML= `<h2>Base Stats</h2>`
                break;
                case "Evolution":
                    infoRender.innerHTML= `<h2>Evolution</h2>`
                break;
                case "Moves":
                    infoRender.innerHTML= `<h2>Moves</h2>`
                break;
            }
        })
    });
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