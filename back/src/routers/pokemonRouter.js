const Pokedex = require('pokedex-promise-v2');
const fileHelper = require("../helpers/fileHelper.js")
const express = require("express");
const userHandler = require("../middleware/userHandler.js");

const pokedex = new Pokedex();
const pokemonRouter = express.Router();
pokemonRouter.use(userHandler);

//Gets pokemon by id
pokemonRouter.get("/get/:id", async (req, res, next) => {
    try {
        const pokemonId = req.params.id; //http://localhost:8080/pokemon/get/1
        const pokemonObj = buildPokemonObj(await pokedex.getPokemonByName(pokemonId));
        res.send(pokemonObj);
    }
    catch (err) {
        console.error(`Cant find a pokemon with ID: ${req.params.id}`)
    }
})

//Gets pokemon by query
pokemonRouter.get("/query", async (req, res, next) => {
    try {
        const pokemonQuery = req.query.name; //http://localhost:8080/pokemon/query?name=pikachu
        const pokemonObj = buildPokemonObj(await pokedex.getPokemonByName(pokemonQuery));
        res.send(pokemonObj);
    }
    catch (err) {
        console.error(`Cant find a pokemon with ID: ${req.query.name}`)
    }
})

//Catchs a pokemon
pokemonRouter.put("/catch/:id", async (req, res) => {
    try {
        const userName = req.headers.username;
        const pokemonId = req.params.id;
        const pokemonObj = buildPokemonObj(await pokedex.getPokemonByName(pokemonId))
        if (!fileHelper.pokemonUnderUser(userName, pokemonId)) {
            fileHelper.catchPokemon(userName, pokemonId, pokemonObj);
        }
        else {
            console.log(`Pokemon "${pokemonId}" already caught by ${userName}`)
        }
    }
    catch (err) {
        console.error(err);
    }
})

//Deletes a pokemon from a user's folder
pokemonRouter.delete("/release/:id", (req, res) => {
    const userName = req.headers.username;
    const pokemonId = req.params.id;
    if (fileHelper.pokemonUnderUser(userName, pokemonId)) {
        fileHelper.releasePokemon(userName, pokemonId)
        res.send(`${userName} released pokemon "${pokemonId}"!`)
    }
    else {
        res.send(`${userName} havent caught pokemon "${pokemonId}"`)
    }
})

//Gets all the pokemon of the logged user
pokemonRouter.get("/", (req, res)=>{
    const user= req.headers.username;
    res.send(fileHelper.allPokemonBy(user));
})

//Adjusting the pokemon object
function buildPokemonObj(apiRes) {
    const abilitiesArr = [];
    for (let i = 0; i < apiRes.abilities.length; i++) {
        abilitiesArr.push(apiRes.abilities[i].ability.name)
    }
    const pokemonObj = {
        name: apiRes.name,
        height: apiRes.height,
        weight: apiRes.weight,
        types: apiRes.types,
        front_pic: apiRes.sprites.front_default,
        back_pic: apiRes.sprites.back_default,
        abilities: abilitiesArr,
    }
    return pokemonObj;
}

module.exports = pokemonRouter;