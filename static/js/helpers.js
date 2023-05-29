import { colours, coloursBackgrounds } from "./constants.js";

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

const convertirPesoEn = (num)=>{
    return (2.20462*num).toFixed(2);
}
const convertirAlturaEn =(num)=>{
    return (num*3.28084).toFixed(2);
}

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

export{
    obtenerTipoPokemon,
    convertirPesoYAltura,
    convertirAlturaEn,
    convertirPesoEn,
    evoluesToRecursing
}