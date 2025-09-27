import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonList(type) {


     // Advance useState//
    const [pokemonListState, setPokemonListState] = useState({
            pokemonList: [],
            isLoading: true,
            pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
            prevUrl: '',
            nextUrl: ''
            
    })
    async function downloadPokemons(){
        


        // Iterating over the array of pokemons, and using their url to create anarray of promises.
        // That will download those 20 pokemons
       
        
        setPokemonListState((state) => ({...state, isLoading: true}));
        const response = await axios.get(pokemonListState.pokedexUrl); //This download the list of 20 pokemons.
        const pokemonResults = response.data.results; //We get the array of pokemons froms result.
        console.log(response.data); 
        setPokemonListState((state) => ({
            ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous
        }))
    
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        
        // Passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultsPromise);  //Array of 20 pokemons detailed data 
        console.log(pokemonData);

        // Now iterate on the data of each pokemon and extract {id, name, image, types}
        const pokeListResult = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return{
                id: pokemon.id,
                name: pokemon.name, 
                image: pokemon.sprites.other.dream_world.front_default, 
                types: pokemon.types}
        }))
        console.log(pokeListResult);
        // setPokemonList(pokeListResult);
        setPokemonListState((state) => ({
            ...state,
            pokemonList: pokeListResult,
            isLoading: false
    }));
    
    }

    useEffect( () => {
       downloadPokemons(); 
    },[pokemonListState.pokedexUrl])

    return[pokemonListState, setPokemonListState]
}



export default usePokemonList; 