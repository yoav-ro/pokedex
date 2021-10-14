//Gets data from PokeAPI
async function getPokemon(pokemonName) {
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
    document.getElementById("name").textContent = "ITS " + pokemonObj.name.toUpperCase() + "!";
    document.getElementById("weight").textContent = "Weight: " + pokemonObj.weight;
    document.getElementById("height").textContent = "Height: " + pokemonObj.height;
    const pokeImg = document.getElementById("image");
    pokeImg.src = pokemonObj.sprites['front_default'];
    pokeImg.addEventListener("mouseover", () => {
        pokeImg.src = pokemonObj.data.sprites["back_default"];
    })
    pokeImg.addEventListener("mouseout", () => {
        pokeImg.src = pokemonObj.sprites['front_default'];
    })
}
