import { colours } from "./constants.js";

const obtenerTipoPokemon = (tipos) => {
    const divTipo = document.createElement('div');
    tipos.forEach(type => {
        let p = document.createElement('p')
        p.style.background = colours[type.type.name]
        p.innerText = type.type.name
        divTipo.appendChild(p)
    })
    divTipo.classList.add('card__tipos')
    return divTipo.outerHTML;
}

const convertirPesoYAltura = (num) => {
    return num / 10
}



export{
    obtenerTipoPokemon,
    convertirPesoYAltura
}