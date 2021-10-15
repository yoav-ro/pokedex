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
    document.getElementById("who").play();
    setTimeout(() => { getPokemonAudio(pokemonName) }, 3000)

    document.body.classList.add("searched")

    //axios
    //getPokemonByName(pokemonName);

    //Fetch
    getPokemonByNameFetch(pokemonName);
}

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
    if (!response.ok) throw Error(result.data)
    return buildPokemonEls(result);
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
    const response = axios.get(typeUrl);
    response.then((value) => {
        return pokemonByType(value.data.pokemon);
    })
}

function pokemonByType(typesObj) {
    const list = document.getElementById("pokemonByType");
    for (let i = 0; i < typesObj.length; i++) {
        const pokemonLi = document.createElement("li");
        pokemonLi.textContent = typesObj[i].pokemon.name;
        pokemonLi.addEventListener("click", () => { getPokemon(typesObj[i].pokemon.name) })
        list.append(pokemonLi)
    }
}

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