import React, {useState, useEffect, useCallback} from "react";
import { Text } from "react-native";
import {useFocusEffect} from '@react-navigation/native';
import { getPokemonFavoriteApi } from "../api/favorite";
import {getPokemonDetailApi} from '../api/pokemon';
import userAuth from '../hooks/useAuth';
import PokemonList from '../components/PokemonList';
import NoLogged from "../components/NoLogged";

export default function FavoriteScreen() {
  const [pokemons, setPokemons] = useState([]);
  const {auth} = userAuth();
  console.log(pokemons);

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonFavoriteApi();
  
          const pokemonsArray = [];
  
          for await (const id of response) {
            const pokemonDetails = await getPokemonDetailApi(id);
  
            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image:
                pokemonDetails.sprites.other["official-artwork"].front_default,
            });
          }
  
          setPokemons(pokemonsArray);
        })();
      }
    }, [auth])
  )

  return (
    !auth ? <NoLogged /> : <PokemonList pokemons={pokemons} />

  );
}
