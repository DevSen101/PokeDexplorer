import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){
    
    // Advance useState//
    const [pokemonListState, setPokemonListState] = useState({
            pokemonList: [],
            isLoading: true,
            pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
            prevUrl: '',
            nextUrl: ''
    })
    async function downloadPokemons(){
        
        setPokemonListState((state) => ({...state, isLoading: true}));

        const response = await axios.get(pokemonListState.pokedexUrl); //This download the list of 20 pokemons.

        const pokemonResults = response.data.results; //We get the array of pokemons froms result.
        console.log(response.data); 
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }))


        // Iterating over the array of pokemons, and using their url to create anarray of promises.
        // That will download those 20 pokemons
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

    return(
        <div className="pokemon-list-wrapper">
        <div>Pokemon List</div>
        <div className="pokemon-wrapper">
            {(pokemonListState.isLoading)?'Data Loading...' : 
            pokemonListState.pokemonList.map((p) => <Pokemon name={p.name}  image={p.image} key={p.id} id={p.id}/>)}
        </div>
        <div className="controls">
            <button disabled={pokemonListState.prevUrl==null} onClick={() =>
              {  const urlToSet = pokemonListState.prevUrl;
                setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet})}}>Prev</button>
            <button disabled={pokemonListState.nextUrl == null} onClick={() => 
                {const urlToSet = pokemonListState.nextUrl;
                setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet})}}>Next</button>
        </div>
        </div>
    )
}

export default PokemonList;