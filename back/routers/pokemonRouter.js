const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();

const express = require("express");
const pokemonRouter = express.Router();

pokemonRouter.get("/pokemon/get/:id", (req, res) => {
    pokedex.getPokemonByName(req.params.id) // with Promise
        .then(function (response) {
            res.send(buildPokemonObj(response))
        })
        .catch(function (error) {
            res.send(`Pokemon ${req.params.id} not found!`)
            console.log('There was an ERROR: ', error);
        });
})

pokemonRouter.get("/pokemon/query", (req, res) => {

})


function buildPokemonObj(apiRes) {
    const abilitiesArr = [];
    for (let i = 0; i < apiRes.abilities.length; i++) {
        console.log(apiRes.abilities[i].name)
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
    console.log(pokemonObj)
    return pokemonObj;
}

module.exports = pokemonRouter;