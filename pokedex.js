//Gets data from PokeAPI
async function getPokemonByName(pokemonName) {
    const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    response.then((pokemonPromise) => {
        return pokemonObject(response);
    })
        .catch((err) => {
            alert(`Pokemon "${pokemonName}" not found!`)
            throw err;
        })
}

//Gets a promise and return an object containing the pokemon's data
function pokemonObject(pokemonPromise) {
    pokemonPromise.then((pokemonObj) => {
        return buildPokemonEls(pokemonObj.data);
    })
}

//Recieves an object containing the pokemon's data and fills the html page accordingly
function buildPokemonEls(pokemonObj) {
    console.log(pokemonObj)
    document.getElementById("name").textContent = "ITS " + pokemonObj.name.toUpperCase() + "!";
    document.getElementById("weight").textContent = "Weight: " + pokemonObj.weight;
    document.getElementById("height").textContent = "Height: " + pokemonObj.height;
    createTypesList(pokemonObj);
    const pokeImg = document.getElementById("image");
    pokeImg.src = pokemonObj.sprites['front_default'];
    pokeImg.addEventListener("mouseover", () => {
        pokeImg.src = pokemonObj.sprites["back_default"];
    })
    pokeImg.addEventListener("mouseout", () => {
        pokeImg.src = pokemonObj.sprites['front_default'];
    })
}

function createTypesList(pokemonObj) {
    const typesArr = pokemonObj.types;
    const typesList = document.getElementById("types");
    for (let i = 0; i < typesArr.length; i++) {
        const typeLi = document.createElement("li");
        typeLi.textContent = typesArr[i].type.name;
        typeLi.addEventListener("click", () => { getPokemonByType(typesArr[i].type.url) })
        typesList.append(typeLi);
    }
}

async function getPokemonByType(typeUrl) {
    console.log("click")
    const response = axios.get(typeUrl);
    response.then((value) => {
        console.log(value)
        return buildTypesList(value.data.pokemon);
    })
}

function buildTypesList(typesObj) {
    const list = document.getElementById("pokemonByType");
    for (let i = 0; i < typesObj.length; i++) {
        const pokemonLi = document.createElement("li");
        pokemonLi.textContent = typesObj[i].pokemon.name;
        pokemonLi.addEventListener("click", () => { getPokemonByName(typesObj[i].pokemon.name) })
        list.append(pokemonLi)
    }
}