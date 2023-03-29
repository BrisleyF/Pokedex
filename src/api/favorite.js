import asyncStorage from '@react-native-community/async-storage';
import { includes, pull } from 'lodash';
import { FAVORITE_STORAGE } from '../utils/constants';

export async function getPokemonFavoriteApi() {
    try {
        const response = await asyncStorage.getItem(FAVORITE_STORAGE);
        return JSON.parse(response || []);
        //return response ? JSON.parse(response) : [];
    } catch (error) {
        throw error;
    }
}

export async function addPokemonFavoriteApi(id) {
    try {
        const favorite = await getPokemonFavoriteApi();
        favorite.push(id);
        await asyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorite));
    } catch (error) {
        throw error;
    }
}

export async function isPokemonFavoriteApi(id) {
    try {
        const response = await getPokemonFavoriteApi();
        return includes(response, id);
    } catch (error) {
        throw error;
    }
}

export async function removePokemonFavoriteApi(id) {
    try {
        const favorites = await getPokemonFavoriteApi(id);
        const newFavorites = pull(favorites, id);
        await asyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
    } catch (error) {
        throw error;
    }
}