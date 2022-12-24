
// Accessing HTML elements
let search = document.querySelector('.search'),
    searchsection = document.querySelector('.searchsection'),
    tableinfo = document.querySelector('.tableinfo'),
    pokeID= document.querySelector('.pokeID'),
    pokeName= document.querySelector('.pokeName'),

    editicon= document.querySelector('.editicon'),
    editsection= document.querySelector('.editsection'),

    pokeid= document.querySelector('#pokeid'),
    pokename= document.querySelector('#pokename'),
    pokeurl= document.querySelector('#pokeurl'),
    updatebtn= document.querySelector('#updatebtn'),

    crossicon= document.querySelector('.crossicon'),

    asciconid= document.querySelector('.asciconid'),
    desciconid= document.querySelector('.desciconid'),

    ascicon= document.querySelector('.ascicon'),
    descicon= document.querySelector('.descicon'),

    pokemons=[],
    pokemonList=[]


// --------------Fetch function---------------------------------------------

const pokemonFetch = async () => {

    try {

        // --------------------------------------Initial fetch-----------------------------
        tableinfo.innerHTML = `<p>Loading..........</p>`

        // Fetching from API
        let resquest = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
        let data = await resquest.json()
        let pokemons = data.results
        
        let pokemonId = 1
        tableinfo.innerHTML=''

        // Giving the list ID and making a new array
        for (let pokemon of pokemons) {
            pokemonList.push({'pokemonId':pokemonId,'pokemonName':pokemon.name,'pokemonURL':pokemon.url})
            pokemonId += 1
        }
        

        // Adding the array data into table
        for (let pokemon of pokemonList) {

            let tableinfoadd=
            `
            <tr class='tableinfo'>
                <td>${pokemon.pokemonId}</td>
                <td class='pokeimgname'>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.pokemonId}.png" class='pokemonimage'/>  ${pokemon.pokemonName}
                </td>
                <td><a href='${pokemon.pokemonURL}' target="_blank">${pokemon.pokemonURL}</a></td>
                <td>
                    <img src="./images/delete.png" alt="Deleting icon" class="deleteicon" id='${pokemon.pokemonId}'>
                </td>
            </tr>
            `

            tableinfo.innerHTML += tableinfoadd

        // Handling delete
            let  deleteIcon= document.querySelectorAll('.deleteicon')
        
            deleteIcon.forEach((delbtn) => {
                delbtn.addEventListener('click', () => {
                    let delelmnt= delbtn.parentElement,
                        delelmnt2= delelmnt.parentElement
                    
                    let i = pokemonList.findIndex((elem) => {
                        return elem.pokemonId === parseInt(delbtn.id)
                    })

                    pokemonList.splice(i,1)
                    delelmnt2.remove()
                })
            })

        }

        // ---------------------------------Search and filter--------------------------------

        search.addEventListener('input', () => {
            let pokemonFilter = pokemonList.filter((pokem) => {
                return pokem.pokemonName.startsWith(search.value.toLowerCase())
            })

            tableinfo.innerHTML=''
            for (let pokemon of pokemonFilter) {

                let tableinfoadd=
                `
                <tr class='tableinfo'>
                    <td>${pokemon.pokemonId}</td>
                    <td class='pokeimgname'>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.pokemonId}.png" class='pokemonimage'/>  ${pokemon.pokemonName}
                    </td>
                    <td><a href='${pokemon.pokemonURL}' target="_blank">${pokemon.pokemonURL}</a></td>
                    <td>
                        <img src="./images/delete.png" alt="Deleting icon" class="deleteicon" id='${pokemon.pokemonId}'>
                    </td>
                </tr>
                `
                tableinfo.innerHTML += tableinfoadd
    
            // Handling delete
                let  deleteIcon= document.querySelectorAll('.deleteicon')
            
                deleteIcon.forEach((delbtn) => {
                    delbtn.addEventListener('click', () => {
                        let delelmnt= delbtn.parentElement,
                            delelmnt2= delelmnt.parentElement
                        
                        let j = pokemonList.findIndex((elem) => {
                            return elem.pokemonId === parseInt(delbtn.id)
                        })
    
                        pokemonList.splice(j,1)
                        delelmnt2.remove()
                    })
                })
    
            }

        })
        
        // -------------------------Handling Sorting----------------------------------------

        // Sorting in ascending order by Name
        const handleSortAscPokemon = () => {
            let pokemonsort = pokemonList.sort((a,b) => {
                if (a.pokemonName.toLowerCase() < b.pokemonName.toLowerCase()
                ) return -1;
                if (a.pokemonName.toLowerCase() > b.pokemonName.toLowerCase()
                ) return 1;
                return 0
            })

            tableinfo.innerHTML=''

            for (let pokemon of pokemonsort) {

                let tableinfoadd=
                `
                <tr class='tableinfo'>
                    <td>${pokemon.pokemonId}</td>
                    <td class='pokeimgname'>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.pokemonId}.png" class='pokemonimage'/>  ${pokemon.pokemonName}
                    </td>
                    <td><a href='${pokemon.pokemonURL}' target="_blank">${pokemon.pokemonURL}</a></td>
                    <td>
                        <img src="./images/delete.png" alt="Deleting icon" class="deleteicon" id='${pokemon.pokemonId}'>
                    </td>
                </tr>
                `
                tableinfo.innerHTML += tableinfoadd

                // Handling delete
                let  deleteIcon= document.querySelectorAll('.deleteicon')
            
                deleteIcon.forEach((delbtn) => {
                    delbtn.addEventListener('click', () => {
                        let delelmnt= delbtn.parentElement,
                            delelmnt2= delelmnt.parentElement

                        let k = pokemonList.findIndex((elem) => {
                            return elem.pokemonId === parseInt(delbtn.id)
                        })
    
                        pokemonList.splice(k,1)
                        delelmnt2.remove()
                    })
                })

            }
        }

        // Sorting in descending order by Name
        const handleSortDescPokemon = () => {
            let pokemonsort = pokemonList.sort((a,b) => {
                if (a.pokemonName.toLowerCase() > b.pokemonName.toLowerCase()
                ) return -1;
                if (a.pokemonName.toLowerCase() < b.pokemonName.toLowerCase()
                ) return 1;
                return 0
            })

            tableinfo.innerHTML=''

            for (let pokemon of pokemonsort) {

                let tableinfoadd=
                `
                <tr class='tableinfo'>
                    <td>${pokemon.pokemonId}</td>
                    <td class='pokeimgname'>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.pokemonId}.png" class='pokemonimage'/>  ${pokemon.pokemonName}
                    </td>
                    <td><a href='${pokemon.pokemonURL}' target="_blank">${pokemon.pokemonURL}</a></td>
                    <td>
                        <img src="./images/delete.png" alt="Deleting icon" class="deleteicon" id='${pokemon.pokemonId}'>
                    </td>
                </tr>
                `
                tableinfo.innerHTML += tableinfoadd

                // Handling delete
                let  deleteIcon= document.querySelectorAll('.deleteicon')

                deleteIcon.forEach((delbtn) => {
                    delbtn.addEventListener('click', () => {
                        let delelmnt= delbtn.parentElement,
                            delelmnt2= delelmnt.parentElement

                        let l = pokemonList.findIndex((elem) => {
                            return elem.pokemonId === parseInt(delbtn.id)
                        })
    
                        pokemonList.splice(l,1)
                        delelmnt2.remove()
                    })
                })
            }
        }


        // Sorting in ascending order by ID
        const handleSortId = () => {
            let pokemonsort = pokemonList.sort((a,b) => {
                return a.pokemonId - b.pokemonId;
            })

            tableinfo.innerHTML=''

            for (let pokemon of pokemonsort) {

                let tableinfoadd=
                `
                <tr class='tableinfo'>
                    <td>${pokemon.pokemonId}</td>
                    <td class='pokeimgname'>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.pokemonId}.png" class='pokemonimage'/>  ${pokemon.pokemonName}
                    </td>
                    <td><a href='${pokemon.pokemonURL}' target="_blank">${pokemon.pokemonURL}</a></td>
                    <td>
                        <img src="./images/delete.png" alt="Deleting icon" class="deleteicon" id='${pokemon.pokemonId}'>
                    </td>
                </tr>
                `
                tableinfo.innerHTML += tableinfoadd

                // Handling delete
                let  deleteIcon= document.querySelectorAll('.deleteicon')

                deleteIcon.forEach((delbtn) => {
                    delbtn.addEventListener('click', () => {
                        let delelmnt= delbtn.parentElement,
                            delelmnt2= delelmnt.parentElement

                        let m = pokemonList.findIndex((elem) => {
                            return elem.pokemonId === parseInt(delbtn.id)
                        })
    
                        pokemonList.splice(m,1)
                        delelmnt2.remove()
                    })
                })
            }
        }

        // Sorting in descending order by ID
        const handleSortIddesc = () => {
            let pokemonsort = pokemonList.sort((a,b) => {
                return b.pokemonId - a.pokemonId;
            })

            tableinfo.innerHTML=''

            for (let pokemon of pokemonsort) {

                let tableinfoadd=
                `
                <tr class='tableinfo'>
                    <td>${pokemon.pokemonId}</td>
                    <td class='pokeimgname'>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.pokemonId}.png" class='pokemonimage'/>  ${pokemon.pokemonName}
                    </td>
                    <td><a href='${pokemon.pokemonURL}' target="_blank">${pokemon.pokemonURL}</a></td>
                    <td>
                        <img src="./images/delete.png" alt="Deleting icon" class="deleteicon" id='${pokemon.pokemonId}'>
                    </td>
                </tr>
                `
                tableinfo.innerHTML += tableinfoadd

                // Handling delete
                let  deleteIcon= document.querySelectorAll('.deleteicon')

                deleteIcon.forEach((delbtn) => {
                    delbtn.addEventListener('click', () => {
                        let delelmnt= delbtn.parentElement,
                            delelmnt2= delelmnt.parentElement

                        let n = pokemonList.findIndex((elem) => {
                            return elem.pokemonId === parseInt(delbtn.id)
                        })
    
                        pokemonList.splice(n,1)
                        delelmnt2.remove()
                    })
                })
            }
        }



    

    // ------------------Listening to click events for sorting--------------------------
    asciconid.addEventListener('click', handleSortId)
    desciconid.addEventListener('click', handleSortIddesc)
    ascicon.addEventListener('click', handleSortAscPokemon)
    descicon.addEventListener('click', handleSortDescPokemon)


    // For editting
    editicon.addEventListener('click', () => {
        editsection.style.display = "flex"
    })

    crossicon.addEventListener('click', () => {
        editsection.style.display = "none"
    })

    updatebtn.addEventListener('click', () => {

        pokeid.setAttribute('placeholder','')
        pokeid.style.border = ''
        pokename.setAttribute('placeholder','')
        pokename.style.border = ''
        pokeurl.setAttribute('placeholder','https://example.com')
        pokeurl.style.border = ''

        if (pokeid.value !== '' && pokename.value !== '' && pokeurl.value !== '') {
            let id = parseInt(pokeid.value),
            name = pokename.value.toLowerCase(),
            url = pokeurl.value.toLowerCase()
        
        let addpokemon = {'pokemonId':id,'pokemonName':name,'pokemonURL':url}
        
        // Finding the index to be edited
        let z = pokemonList.findIndex((elem) => {
            return elem.pokemonId === id
        })

        pokemonList.splice(z,1,addpokemon)

        pokeid.value=''
        pokename.value=''
        pokeurl.value=''
        search.value=''

        // Updating table
        tableinfo.innerHTML=''

        for (let pokemon of pokemonList) {

            let tableinfoadd=
            `
            <tr class='tableinfo'>
                <td>${pokemon.pokemonId}</td>
                <td class='pokeimgname'>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.pokemonId}.png" class='pokemonimage'/>  ${pokemon.pokemonName}
                </td>
                <td><a href='${pokemon.pokemonURL}' target="_blank">${pokemon.pokemonURL}</a></td>
                <td>
                    <img src="./images/delete.png" alt="Deleting icon" class="deleteicon" id='${pokemon.pokemonId}'>
                </td>
            </tr>
            `

            tableinfo.innerHTML += tableinfoadd

        // Handling delete
            let  deleteIcon= document.querySelectorAll('.deleteicon')
        
            deleteIcon.forEach((delbtn) => {
                delbtn.addEventListener('click', () => {
                    let delelmnt= delbtn.parentElement,
                        delelmnt2= delelmnt.parentElement
                    
                    let i = pokemonList.findIndex((elem) => {
                        return elem.pokemonId === parseInt(delbtn.id)
                    })

                    pokemonList.splice(i,1)
                    delelmnt2.remove()
                })
            })

        }
            
        } else {
            pokeid.setAttribute('placeholder','*')
            pokeid.style.border = '1px solid red'
            pokename.setAttribute('placeholder','*')
            pokename.style.border = '1px solid red'
            pokeurl.setAttribute('placeholder','* https://example.com')
            pokeurl.style.border = '1px solid red'
        }

       
    })

    } // try ends here

    catch (error) {
        console.error(error)
    }
}

//---------------------------------Calling the function--------------------------------
pokemonFetch()














