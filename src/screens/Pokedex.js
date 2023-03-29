import React, {useState, useEffect} from "react";
import { View } from 'react-native';
import { getPokemonsApi, getPokemonDetailByUrlApi } from '../api/pokemon';
import PokemonList from "../components/PokemonList";

export default function PokedexScreen() {

    const [pokemons, setPekemons] = useState([]);

    const [nextUrl, setNextUrl] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect( () => {
        (async () => {
            await loadPokemons();
        })();
    }, [])

    const loadPokemons = async () => {
        try {
            setLoading(true);

            const response = await getPokemonsApi(nextUrl);
            
            setNextUrl(response.next);
            
            const pokemonsArray = [];

            for await (const pokemon of response.results) {
                const pokemonDetails = await getPokemonDetailByUrlApi(pokemon.url);
                
                pokemonsArray.push({
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    type: pokemonDetails.types[0].type.name,
                    order: pokemonDetails.order,
                    image: pokemonDetails.sprites.other['official-artwork'].front_default
                })
            }

            setPekemons([...pokemons, ...pokemonsArray]);

        } catch (error) {
            console.error(error);
        }  
        setLoading(false);

    }

    return (
        <View>
            <PokemonList 
            pokemons={pokemons} 
            loadPokemons={loadPokemons}
            isNext={nextUrl}
            isLoading={loading}
            />
        </View>
    )
}

