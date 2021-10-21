function getPokemon(pokemonName) {
    if (pokemonName === "") {
        alert("Invalid input! No pokemon searched!")
        throw "No pokemon searched"
    }
    if (!isNaN(pokemonName)) {
        alert(`Invalid input! ${pokemonName} is not a pokemon!`)
        throw "Cant search a number"
    }
    document.getElementById("nameInput").value = pokemonName;
    resetElements("types", "pokemonByType");

    document.body.classList.add("searched")
    getPokemonFromAPI(pokemonName);
}

//
function getPokemonFromAPI(pokemonName) {
    //Using fetch
    //const pokemonPromise = getPokemonByNameFetch(pokemonName);

    //Using axsion
    const pokemonPromise = getPokemonByNameAxios(pokemonName);
    checkPromise(pokemonPromise, pokemonName);
}

//If the promise is fullfieled, proceeds to play media and build the elements. Else, throws an error 
function checkPromise(pokemonPromise, pokemonName) {
    pokemonPromise.then((pokemonObj) => {
        playMedia(pokemonName);
        return buildPokemonEls(pokemonObj);
    })
        .catch((err) => {
            const errStr = `Pokemon "${pokemonName}" not found!`
            alert(errStr)
            throw err + " | " + errStr;
        })
}

//Plays the audio
function playMedia(pokemonName) {
    document.getElementById("who").play();
    setTimeout(() => { getPokemonAudio(pokemonName) }, 3500)
}

//Gets data from PokeAPI using fetch
async function getPokemonByNameFetch(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }
    )
    const result = await response.json();
    return result;
}

//Gets data from PokeAPI using Axios
async function getPokemonByNameAxios(pokemonName) {
    const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.then((value) => {
        return value.data;
    })
}

//Recieves an object containing the pokemon's data and fills the html page accordingly
function buildPokemonEls(pokemonObj) {
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

//Creates a list of the the types of the given pokemon
function createTypesList(pokemonObj) {
    const typesArr = pokemonObj.types;
    const typesList = document.getElementById("types");
    for (let i = 0; i < typesArr.length; i++) {
        const typeLi = document.createElement("li");
        typeLi.textContent = typesArr[i].type.name;
        //Using axios
        //typeLi.addEventListener("click", () => { getPokemonByTypeAxios(typesArr[i].type.url) })
        //Using fetch
        typeLi.addEventListener("click", () => { getPokemonByTypeFetch(typesArr[i].type.url) })
        typesList.append(typeLi);
    }
}

//Gets all the pokemons belonging to the given type usiong Axios
async function getPokemonByTypeAxios(typeUrl) {
    const response = axios.get(typeUrl);
    response.then((value) => {
        return pokemonByType(value.data.pokemon);
    })
}

async function getPokemonByTypeFetch(typeUrl) {
    const response = await fetch(typeUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })
    const result= response.json();
    result.then((pokemonLst)=>{
        return pokemonByType(pokemonLst.pokemon);
    })
}

//Builds a lists containing all the pokemon of a given type
function pokemonByType(typesObj) {
    console.log(typesObj)
    const list = document.getElementById("pokemonByType");
    for (let i = 0; i < typesObj.length; i++) {
        const pokemonLi = document.createElement("li");
        pokemonLi.textContent = typesObj[i].pokemon.name;
        pokemonLi.addEventListener("click", () => { getPokemon(typesObj[i].pokemon.name) })
        list.append(pokemonLi)
    }
}

//Removes all child elements from all the given elements
function resetElements(...elementToReset) {
    for (el of elementToReset) {
        document.getElementById(`${el}`).innerHTML = "";
    }
}

//Plays the given text using text to speach
async function getPokemonAudio(pokemonName) {
    const toSpeak = new SpeechSynthesisUtterance("it is" + pokemonName);
    const voices = speechSynthesis.getVoices();
    toSpeak.voice = voices[1];
    speechSynthesis.speak(toSpeak);
}