import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');


    const [prevUrl, setPrevUrl] = useState('');
    const [nextUrl, setNextUrl] = useState('');


    async function downloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(pokedexUrl); //This download the list of 20 pokemons.

        const pokemonResults = response.data.results; //We get the array of pokemons froms result.
        console.log(response.data); 
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next)

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
        setPokemonList(pokeListResult);
        setIsLoading(false);
    }


    useEffect( () => {
       downloadPokemons(); 
    },[pokedexUrl])

    return(
        <div className="pokemon-list-wrapper">
        <div>Pokemon List</div>
        <div className="pokemon-wrapper">
            {(isLoading)?'Data Loading...' : 
            pokemonList.map((p) => <Pokemon name={p.name}  image={p.image} key={p.id} />)}
        </div>
        <div className="controls">
            <button disabled={prevUrl==null} onClick={() => setPokedexUrl(prevUrl)}> Prev</button>
            <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
        </div>
        </div>
    )
}

export default PokemonList;