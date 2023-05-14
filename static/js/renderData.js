import { coloursBackgrounds, content } from "./constants.js";
import { convertirPesoYAltura, obtenerTipoPokemon ,convertirAlturaEn,convertirPesoEn } from "./helpers.js";
import { getAbilities, obtenerInfoPokemon } from "./getData.js";
const section_pokemons = document.querySelector('.section-pokemons');
const infoPokemon = document.querySelector('.section-info');

const evoluesToRecursing = (cadenaDeEvolucion,arreglo)=>{
    //console.log(cadenaDeEvolucion);
    for(const e in cadenaDeEvolucion){
        //console.log(e);
        if((e == 'evolves_to')&&(cadenaDeEvolucion[e].length==1)){
            //console.log('123');
            evoluesToRecursing(cadenaDeEvolucion[e][0],arreglo)
        }
        if(e=='species'){
            arreglo.unshift(cadenaDeEvolucion[e].name)
            return arreglo
        }
    }
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

const renderEvolutions =async (species)=>{
    let evoluciones =await getEvolutions(species);
    console.log(evoluciones);
    let etiquetas = ''
    for (let i = 0; i < evoluciones.length; i++) {
        const img = `<img src="${evoluciones[i].sprites.front_default}">`
        etiquetas+=img
    }
    console.log(etiquetas);
    return etiquetas
 
    //console.log(dataEvolutions);
    
    // const e = await getEvolutions(species)
    // console.log(e);
    //const evoluciones =await getEvolutions(species);
    // Promise.all(evoluciones).then(values=>{
    //      console.log(values);
    // })

}

const renderStats=(stats)=>{
    let etiquetas = ''
    //ul.classList.add('info-pokemon__data')
    stats.forEach(stat => {
        const li = `<li>
        <label for="file">${stat.stat.name}</label>
        <progress class='progress ${(stat.base_stat>=50?'green-bar':'red-bar')}' id="file" max="100" value="${stat.base_stat}"> 70% </progress>
        </li>`
        //ul.innerText(li)
        etiquetas+=li;
    });
    return `<ul class="info-pokemon__data">${etiquetas}</ul>`
}

const renderInfo = (data) =>{
    let peso = convertirPesoYAltura(data.weight);
    let altura = convertirPesoYAltura(data.height);
    return `
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
}

const eventoSeleccionarCard = (data) => {
    
    const info_pokemon = document.querySelector('.info-pokemon')
    //info_pokemon.innerHTML = div;
    info_pokemon.style.background=coloursBackgrounds[data.types[0].type.name]
    const data_name = document.querySelector('.data-name');
    const data_img = document.querySelector('.data-img');
    data_name.innerHTML = data.name;
    data_img.src = data.sprites.other.home.front_default;
    const arreglo = document.querySelectorAll('.info-items');
    const infoRender = document.querySelector('#info-render');
    infoRender.innerHTML = renderInfo(data)
    
   
    const activa = document.querySelector('.activa')
    activa.classList.remove('activa')
    arreglo[0].classList.add('activa')
    
    //activa.classList.remove('activa')
    arreglo.forEach((element,idx)=>{
        
        element.addEventListener('click',async(e)=>{
            e.preventDefault();
            const activa = document.querySelector('.activa');
            activa.classList.remove('activa')
            element.classList.add('activa');
            
            //infoRender.innerHTML=content[element.textContent]
            
            switch(element.textContent){

                case "About":
                    infoRender.innerHTML=renderInfo(data)
                break;
                case "Base Stats":
                    infoRender.innerHTML= `<h2>Base Stats</h2>
                    ${renderStats(data.stats)}
                    `
                break;
                case "Evolution":
                    infoRender.innerHTML= `<h2>Evolution</h2>
                    ${await renderEvolutions(data.species)}
                    `
                    
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
            <div class="card__info">
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
    divCard.addEventListener('click', (e) => {
        e.preventDefault();
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