import { colours, coloursBackgrounds, content } from "./constants.js";
import { convertirPesoYAltura, obtenerTipoPokemon, convertirAlturaEn, convertirPesoEn } from "./helpers.js";
import { getAbilities, getEvolutions } from "./getData.js";
const section_pokemons = document.querySelector('.section-pokemons');
const infoPokemon = document.querySelector('.section-info');

const getSpeciesInfo = async (species) => {
    const infoSpeciesData = await fetch(species.url)
    const speciesData = await infoSpeciesData.json();
    // console.log(speciesData.flavor_text_entries[0]);
    return speciesData.flavor_text_entries[0].flavor_text;
}




const renderEvolutions = (s) => {
    // let evoluciones =await getEvolutions(species);
    let etiquetas = ''
    for (let i = 0; i < s.length; i++) {
        const img = `
        <div class="info-pokemon__evolutions">
            <div class="evolution-img">
                <img style="background:${coloursBackgrounds[s[i].types[0].type.name]}" src="${s[i].sprites.front_default}">
            </div>
            <div class="evolution-data">
                <p>#${s[i].id}</p>
                <h3>${s[i].name}</h3>
                <div class="evolutions-types">
                ${getImgTypes(s[i].types)}
                </div>
                
                
            </div>
        </div>
        
        `
        etiquetas += img
    }
    // console.log(etiquetas);
    return etiquetas;
}

const renderStats = (stats, colorPoke, colorPoke2) => {
    let etiquetas = ''
    //ul.classList.add('info-pokemon__data')
    console.log(colorPoke);
    stats.forEach((stat) => {
        const div = `<div class='item-progress'>
        <p for="file">${stat.stat.name}</p>
        <div class='progress per' style="background-image: conic-gradient(${colorPoke} ${(stat.base_stat * 100) / 150}%, ${colorPoke2} 0);box-shadow: 0px 0px 10px 3px ${colorPoke};">
            <div class='progress inner'>   
                <p>${stat.base_stat}</p>
            </div>
        </div>
        </div>`
        //ul.innerText(li)
        etiquetas += div;
    });

    return `<div class="info-pokemon__stats">${etiquetas}</div>`
}
const getImgTypes = (types) => {
    let imgLogo = '';
    for (let i = 0; i < types.length; i++) {
        imgLogo += `<div class="icon ${types[i].type.name}">
        <img src="static/img/iconos-types/${types[i].type.name}.svg"/>
    </div>`
    }
    return imgLogo


}
const renderInfo = (data, ifo) => {
    let peso = convertirPesoYAltura(data.weight);
    let altura = convertirPesoYAltura(data.height);
    console.log(data.types);
    return `
    <div class="info-pokemon__data">
        <div class='info-pokemon__carddata'>
            <p>${ifo}</p>
        </div>
        <div class='info-pokemon__carddata'>
            <div class='info-pokemon__pa'>
                <p>${peso} kg</br>-</br>${convertirPesoEn(altura)} lbs</p>
                <p>Weight</p>
            </div>
            <div class='info-pokemon__pa'>
                <p>${altura}m</br>-</br>${convertirAlturaEn(altura)} ft</p>
                <p>Height</p>
            </div>
        </div>
        <div class='info-pokemon__carddata'>
            <div class='info-pokemon__t'>
                ${getImgTypes(data.types)}
            </div>
                
            <div class='info-pokemon__pa'>
                <p>${getAbilities(data.abilities)}</p>
                <p>Abilities</p>
            </div>
        </div>
        
    </div>
    <h4>Breeding</h4>
    <ul class="info-pokemon__data">
        <li>Gender</li>
        <li>Eggs Groups</li>
        <li>Eggs clicle</li>
    </ul>`
}

const eventoSeleccionarCard = (data, species, info) => {

    const arreglo = document.querySelectorAll('.info-items');
    const infoRender = document.querySelector('#info-render');
    const colorPoke = colours[data.types[0].type.name]
    const colorPoke2 = coloursBackgrounds[data.types[0].type.name]
    const activa = document.querySelector('.activa')
    activa.classList.remove('activa')
    arreglo[0].classList.add('activa')
        ;
    // let evolutionRender = renderEvolutions(data.species);

    //activa.classList.remove('activa')
    arreglo.forEach((element, idx) => {

        element.addEventListener('click', async (e) => {
            // let ifo = await info;
            // infoRender.innerHTML=renderInfo(data,ifo)
            e.preventDefault();
            const activa = document.querySelector('.activa');
            activa.classList.remove('activa')
            element.classList.add('activa');


            //infoRender.innerHTML=content[element.textContent]
            switch (element.textContent) {

                case "About":
                    let ifo = await info;
                    console.log(ifo);
                    infoRender.innerHTML = renderInfo(data, ifo);
                    break;
                case "Base Stats":
                    infoRender.innerHTML = `${renderStats(data.stats, colorPoke, colorPoke2)}`
                    break;
                case "Evolution":
                    let s = await species;
                    let r = renderEvolutions(s)
                    infoRender.innerHTML = `<h2>Evolution</h2>
                    ${r}
                    `
                    break;
                case "Moves":
                    infoRender.innerHTML = `<h2>Moves</h2>`
                    // console.log(data.moves)
                    let arr = []
                    data.moves.forEach(move => {
                        if (!arr.includes(move.move.name)) {
                            arr.push(move.move.name)
                        }
                    });
                    console.log(arr);
                    break;
            }
        })
    });
}
const renderInfoPokemon = async (data, info) => {
    let ifo = await info;
    const info_pokemon = document.querySelector('.info-pokemon')
    //info_pokemon.innerHTML = div;
    info_pokemon.style.background = coloursBackgrounds[data.types[0].type.name];
    // background: rgb(238, 174, 202);
    info_pokemon.style.background = `radial-gradient(circle,#ffffffF7 0%, ${colours[data.types[0].type.name]} 60%,#444 100%)`
    const data_name = document.querySelector('.data-name');
    const data_img = document.querySelector('.data-img');
    data_name.innerHTML = data.name;
    data_img.src = data.sprites.other.dream_world.front_default;
    const infoRender = document.querySelector('#info-render');
    infoRender.innerHTML = renderInfo(data, ifo);

}
const insertarCard = (data) => {
    let div = `
            <div class="card__fondo">
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
            </div>
    `
    const divCard = document.createElement('div');
    divCard.style.background = colours[data.types[0].type.name]
    divCard.classList.add("card")
    divCard.innerHTML = div;
    let species = getEvolutions(data.species);
    let infoSpecies = getSpeciesInfo(data.species);

    divCard.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionInfoLoading = document.querySelector('.section-info-loading');
        const sectionInfo = document.querySelector('.info-pokemon');
        sectionInfoLoading.style.display = 'none';
        sectionInfo.style.display = 'inherit';
        renderInfoPokemon(data, infoSpecies);
        eventoSeleccionarCard(data, species, infoSpecies);
    })
    section_pokemons.appendChild(divCard);
    let i = Number(localStorage.getItem('i'))
    i = (data.id > i) ? data.id : i;
    localStorage.setItem('i', i.toString())

}

export {
    insertarCard
}