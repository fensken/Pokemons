
let search = document.querySelector('.search'),
    tableinfo = document.querySelector('.tableinfo'),
    pokemons=[]



const pokemonFetch = async () => {

    tableinfo.innerHTML = `<p>Loading..........</p>`

    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    let data = await response.json()
    console.log(data)
    

    let pokemons = data.results
    console.log(pokemons)

    let pokemonId=1

    tableinfo.innerHTML=''

    for (let pokemon of pokemons) {
    
        let tableinfoadd=
        `
        <tr class='tableinfo'>
            <td>${pokemonId}</td>
            <td>${pokemon.name}</td>
            <td><a href='${pokemon.url}' target="_blank">${pokemon.url}</a></td>
        </tr>
        `
        pokemonId += 1

        tableinfo.innerHTML += tableinfoadd
    }

}

pokemonFetch()
