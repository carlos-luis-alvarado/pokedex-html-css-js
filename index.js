import { obtenerInfoPokemon } from "./static/js/getData.js";
import { insertarCard } from "./static/js/renderData.js";

localStorage.removeItem('i')

const main = async () => {
    let i = (localStorage.getItem('i') == null) ? 0 : localStorage.getItem('i');
    i = Number(i)
    let pokemons = await obtenerInfoPokemon();
    pokemons.forEach(async(pokemon, index) => {
        //console.log(pokemon);
        let pokemonData =await obtenerInfoPokemon(index + 1 + i);
        // const [pokemonData,dataSpecies] = Promise.all([obtenerInfoPokemon(index + 1 + i),renderEvolutions(data.species)])
        insertarCard(pokemonData)
    })
}
main();




const body = document.querySelector('html')

window.onload = () => {

    //Medida de Scroll top , inicial 0
    //console.log('scrollTop ' + body.scrollTop);
    //Tamanio de la pagina(todo el contenido)
    //console.log('viewport ' + body.scrollHeight);
    //Tamanio de la pantalla
    console.log('altura doc ' + body.clientHeight)
    console.log(localStorage.getItem('i'));
    addEventListener('scroll', e => {
        // console.log('scrollTop '+body.scrollTop);
        // console.log('viewport '+body.scrollHeight);
        // console.log('altura doc '+body.clientHeight)
        if (body.scrollHeight - Math.trunc(body.scrollTop) - body.clientHeight == 0) {
            console.log("fin");
            console.log(localStorage.getItem('i'));
            main()
        }
    })

}

let enlaces = document.querySelectorAll('.mas-info')
enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {
        e.preventDefault()
    })
})