import axios from "axios";
import { useState, useEffect } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id){
    // const {id} = useParams({});
    // const[isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState({})
    // let pokemonListHookResponse = [];
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name: ''}`)
        
        setPokemon({
            image: response.data.sprites.other.dream_world.front_default,
            name: response.data.name,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            similarPokemons: pokemonOfSameTypes.data.pokemon.slice(0,5)
        });

        setPokemonListState({...pokemonListState, type: response.data.types ? response.data.types[0].type.name: ''})
    }

    
   const [pokemonListState, setPokemonListState] =  usePokemonList();
   
    useEffect(() => {
        downloadPokemon();
        console.log("List", pokemon.types, pokemonListState );

    }, []);
    return [pokemon]
}

export default usePokemonDetails;