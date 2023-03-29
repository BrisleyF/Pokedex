import React from "react";
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import PokemonCard from "./PokemonCard";

export default function PokemonList(props) {
    const {pokemons, loadPokemons, isNext, isLoading } = props;

    const loadMore = () => {
        loadPokemons();
    }

    return (
        <FlatList 
            data={pokemons}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(pokemon) => String(pokemon.id)}
            renderItem={({item}) => <PokemonCard pokemon={item}/>}
            contentContainerStyle={styles.flatListContainer}
            onEndReached={(!isLoading && isNext) && loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={(isLoading && isNext) && ( 
                <ActivityIndicator
                size='large'
                style={styles.spinner}
                color='#AEAEAE'
                />
    )
            }
        />
    )
}

const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: 5,
        marginTop: 10,
    },
    spinner: {
        marginTop: 20,
        marginBottom: 60,
    }
})