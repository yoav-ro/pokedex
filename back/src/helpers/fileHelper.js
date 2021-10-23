const fs = require("fs");
const path = require("path");

//Creates a user folder under ./users
function createUserFile(userName) {
    fs.mkdirSync(getUserPath(userName));
}

//Checks if a user's folder exists
function doesUserFileExist(userName) {
    if (fs.existsSync(getUserPath(userName))) {
        return true;
    }
    return false;
}

//Checks if a given pokemon is caught by the given user
function pokemonUnderUser(userName, pokemonID) {
    const path = getUserPath(userName) + `/${pokemonID}.json`
    return fs.existsSync(path)
}

//Catching a pokemon
function catchPokemon(userName, pokemonID, pokemonObj) {
    const path = getUserPath(userName) + `/${pokemonID}.json`;
    fs.writeFileSync(path, JSON.stringify(pokemonObj))
}

//Gets the path to a given user's folder
function getUserPath(username) {
    return path.resolve(__dirname, `../users/${username}/`);
}

//Deletes a given pokemon from the given user's folder
function releasePokemon(userName, pokemonId) {
    const deletePath = getUserPath(userName) + `/${pokemonId}.json`
    fs.unlinkSync(deletePath)
}

//Gets all the pokemon caught by a given user
function allPokemonBy(userName) {
    const pokemonObjArr = [];
    const userPath= getUserPath(userName);
    const pokemonFilesArr= fs.readdirSync(userPath);
    for(let i=0; i<pokemonFilesArr.length; i++){
        const pokemonPath= path.resolve(userPath, pokemonFilesArr[i]);
        pokemonObjArr.push(JSON.parse(fs.readFileSync(pokemonPath)))
    }
    return pokemonObjArr;
}


module.exports = {
    createUserFile,
    doesUserFileExist,
    pokemonUnderUser,
    catchPokemon,
    releasePokemon,
    allPokemonBy
}